import {
  BadRequestException,
  Body,
  CanActivate,
  Header,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/userPayload';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { extractCpfFromToken } from './middleware/verify-cpf';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { cpfToHmac } from 'src/util/crypto.util';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly jwtService: JwtService,
    protected prisma: PrismaService,
  ) {}

  // MÉTODO MODIFICADO (signup)
  async signup(user: User) {
    // 2. Converta o CPF para HMAC para salvar e buscar
    const hmacCpf = cpfToHmac(user.cpf);

    // 3. Verifique se o usuário já existe (usando o HMAC e 'cpf' minúsculo)
    const userExists = await this.prisma.fiscal.findUnique({
      where: { cpf: hmacCpf },
    });

    if (userExists) {
      throw new Error('Usuário já existe');
    }

    const hashedPassword = await bcrypt.hash(user.senha, 10);

    // 4. Crie o novo usuário (usando o HMAC e campos minúsculos)
    const newUser = await this.prisma.fiscal.create({
      data: {
        cpf: hmacCpf, // Salva o HMAC
        nome: user.nome,
        senha: hashedPassword,
        tipo: user.tipo,
      },
    });

    if (!newUser) {
      throw new Error('Erro ao criar o usuário');
    }

    const roleMap = {
      0: 'fiscal',
      1: 'administrador',
    };

    // 5. O Payload do JWT DEVE conter o CPF original (plaintext)
    const payload: UserPayload = {
      cpf: user.cpf, // Importante: CPF original, não o HMAC
      nome: user.nome,
      tipo: roleMap[user.tipo],
    };

    const token = this.jwtService.sign(payload);

    return {
      status: 'success',
      message: 'Usuário registrado com sucesso!',
      token,
    };
  }

  // MÉTODO MODIFICADO (login)
  async login(user: LoginUserDto) {
    // 6. Converta o CPF do login para HMAC antes de buscar
    const hmacCpf = cpfToHmac(user.cpf);

    // 7. Verifique se o cpf existe (usando o HMAC e 'cpf' minúsculo)
    const verifyUser = await this.prisma.fiscal.findUnique({
      where: { cpf: hmacCpf },
    });

    if (!verifyUser) throw new NotFoundException('Usuário nao encontrado');

    // 8. Use 'senha' minúscula
    const isPasswordValid = await bcrypt.compare(user.senha, verifyUser.senha);

    if (!isPasswordValid) throw new UnauthorizedException('Senha incorreta');

    const roleMap = {
      0: 'fiscal',
      1: 'administrador',
    };

    // 9. O Payload do JWT DEVE conter o CPF original (plaintext)
    const payload: UserPayload = {
      cpf: user.cpf, // Importante: CPF original do DTO, não o HMAC
      nome: verifyUser.nome, // Corrigido para minúsculo
      tipo: roleMap[verifyUser.tipo], // Corrigido para minúsculo
    };

    return {
      status: 'success',
      token: this.jwtService.sign(payload),
    };
  }

  // MÉTODO MODIFICADO (updatePassword)
  async updatePassword(
    cpf: string, // Este é o CPF plaintext do usuário logado
    currentPassword: string,
    newPassword: string,
    newPasswordConfirm: string,
  ) {
    // 10. `userService.findByCpf` já lida com o HMAC internamente
    const user = await this.userService.findByCpf(cpf);

    if (!user) throw new NotFoundException('Usuário não encontrado');

    // 11. Corrija os nomes dos campos para minúsculas
    const passwordMatches = await bcrypt.compare(currentPassword, user.senha);

    if (!passwordMatches) {
      throw new BadRequestException('Senha atual incorreta');
    }

    if (newPassword !== newPasswordConfirm) {
      throw new BadRequestException('Senhas nao conferem');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // 12. O 'user.cpf' retornado pelo service já é o HMAC
    await this.prisma.fiscal.update({
      where: { cpf: user.cpf },
      data: { senha: hashedNewPassword },
    });

    return { status: 'success', message: 'Senha atualizada com sucesso' };
  }

  // MÉTODO MODIFICADO (updateOwnPassword)
  async updateOwnPassword(
    password: string,
    passwordConfirm: string,
    cpf: string, // Este é o CPF plaintext
  ) {
    // 13. `userService.findByCpf` já lida com o HMAC
    const user = await this.userService.findByCpf(cpf);

    if (!user) throw new NotFoundException('Usuário nao encontrado');

    if (password !== passwordConfirm) {
      throw new BadRequestException('Senhas nao conferem');
    }

    const hashedNewPassword = await bcrypt.hash(password, 10);

    // 14. O 'user.cpf' retornado já é o HMAC
    await this.prisma.fiscal.update({
      where: { cpf: user.cpf },
      data: { senha: hashedNewPassword },
    });

    return { status: 'success', message: 'Senha atualizada com sucesso' };
  }

  // MÉTODO MODIFICADO (updateAnyPassword)
  async updateAnyPassword(
    adminPassword: string,
    targetCpf: string, // CPF plaintext do alvo
    newPassword: string,
  ) {
    // 15. `userService.findByCpf` lida com o HMAC para o alvo
    const user = await this.userService.findByCpf(targetCpf);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const adminCpf = extractCpfFromToken['cpf']; // CPF plaintext do admin
    // 16. `userService.findByCpf` lida com o HMAC para o admin
    const adminUser = await this.userService.findByCpf(adminCpf);

    if (!adminUser) {
      throw new NotFoundException('Administrador não encontrado');
    }

    // 17. Corrija o nome do campo para 'senha'
    const passwordMatches = await bcrypt.compare(
      adminPassword,
      adminUser.senha,
    );

    if (!passwordMatches) {
      throw new BadRequestException('Senha do administrador incorreta');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // 18. O 'user.cpf' retornado já é o HMAC
    await this.prisma.fiscal.update({
      where: { cpf: user.cpf },
      data: { senha: hashedNewPassword },
    });

    return { status: 'success', message: 'Senha alterada com sucesso' };
  }

  // MÉTODO MODIFICADO (deleteUserByCpf)
  async deleteUserByCpf(cpf: string) { // CPF plaintext
    // 19. `userService.findByCpf` lida com o HMAC
    const user = await this.userService.findByCpf(cpf);

    if (!user) {
      return { message: 'Usuário nao encontrado' };
    }

    // 20. O 'user.cpf' retornado já é o HMAC
    await this.prisma.fiscal.delete({ where: { cpf: user.cpf } });

    return { status: 'success', message: 'Usuário excluido com sucesso' };
  }

  // MÉTODO MODIFICADO (validateUser)
  async validateUser(cpf: string, senha: string) { // CPF plaintext
    // 21. `userService.findByCpf` lida com o HMAC
    const user = await this.userService.findByCpf(cpf);

    if (user) {
      // 22. Corrija o nome do campo para 'senha'
      const isPasswordValid = await bcrypt.compare(senha, user.senha);

      if (isPasswordValid) {
        return {
          ...user,
          senha: undefined,
        };
      }
    }

    throw new UnauthorizedException('CPF ou senha incorretos');
  }
}