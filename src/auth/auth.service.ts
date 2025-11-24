import {
  BadRequestException,
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
import { extractIdFromToken } from './middleware/verify-user-id';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { cpfToHmac } from 'src/util/crypto.util';
import { tipo_usuario } from 'src/user/entities/user.entity';

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

    // 5. O Payload do JWT DEVE conter o CPF original (plaintext)
    const payload: UserPayload = {
      id: newUser.id,
      nome: user.nome,
      tipo: user.tipo,
    };

    const token = this.jwtService.sign(payload);

    return {
      status: 'success',
      message: 'Usuário registrado com sucesso!',
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

    const isPasswordValid = await bcrypt.compare(user.senha, verifyUser.senha);

    if (!isPasswordValid) throw new UnauthorizedException('senha incorreta');

    // 9. O Payload do JWT DEVE conter o CPF original (plaintext)
    const payload: UserPayload = {
      id: verifyUser.id,
      nome: verifyUser.nome,
      tipo: verifyUser.tipo,
    };

    return {
      status: 'success',
      user: {
        id: verifyUser.id,
        nome: verifyUser.nome,
        tipo: verifyUser.tipo,
      },
      token: this.jwtService.sign(payload),
    };
  }

  async updatePassword(
    id: number,
    currentPassword: string,
    newPassword: string,
    newPasswordConfirm: string,
  ) {
    //verificar se usuário existe:
    const user = await this.userService.findById(id);

    if (!user) throw new NotFoundException('Usuário não encontrado');

    //verificar se a senha atual esta correta
    const passwordMatches = await bcrypt.compare(currentPassword, user.senha);

    if (!passwordMatches) {
      throw new BadRequestException('senha atual incorreta');
    }

    if (newPassword !== newPasswordConfirm) {
      throw new BadRequestException('senhas nao conferem');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // 12. O 'user.cpf' retornado pelo service já é o HMAC
    await this.prisma.fiscal.update({
      where: { id: user.id },
      data: { senha: hashedNewPassword },
    });

    return { status: 'success', message: 'senha atualizada com sucesso' };
  }

  // MÉTODO MODIFICADO (updateOwnPassword)
  async updateOwnPassword(
    password: string,
    passwordConfirm: string,
    id: number,
  ) {
    // 13. `userService.findByCpf` já lida com o HMAC
    const user = await this.userService.findById(id);

    if (!user) throw new NotFoundException('Usuário nao encontrado');

    if (password !== passwordConfirm) {
      throw new BadRequestException('senhas nao conferem');
    }

    const hashedNewPassword = await bcrypt.hash(password, 10);

    // 14. O 'user.cpf' retornado já é o HMAC
    await this.prisma.fiscal.update({
      where: { id: user.id },
      data: { senha: hashedNewPassword },
    });

    return { status: 'success', message: 'senha atualizada com sucesso' };
  }

  // MÉTODO MODIFICADO (updateAnyPassword)
  async updateAnyPassword(
    adminPassword: string,
    targetId: number,
    newPassword: string,
    authorization: string,
  ) {
    // Buscar o usuário alvo (cuja senha será alterada)
    const user = await this.userService.findById(targetId);

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    // Extrair id do admin autenticado (exemplo: vindo do token)
    const adminId = extractIdFromToken['id'];
    const adminUser = await this.userService.findById(adminId);

    if (!adminUser) {
      throw new NotFoundException('Administrador não encontrado');
    }

    // 17. Corrija o nome do campo para 'senha'
    const passwordMatches = await bcrypt.compare(
      adminPassword,
      adminUser.senha,
    );

    if (!passwordMatches) {
      throw new BadRequestException('senha do administrador incorreta');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.senha = hashedNewPassword;

    // 18. O 'user.cpf' retornado já é o HMAC
    await this.prisma.fiscal.update({
      where: { id: user.id },
      data: { senha: hashedNewPassword },
    });

    return { status: 'success', message: 'senha alterada com sucesso' };
  }

  async deleteUserById(id: number) {
    const user = await this.userService.findById(id);

    if (!user) {
      return { message: 'Usuário nao encontrado' };
    }

    await this.prisma.fiscal.delete({ where: { id: user.id } });

    return { status: 'success', message: 'Usuário excluido com sucesso' };
  }

  // MÉTODO MODIFICADO (validateUser)
  async validateUser(cpf: string, senha: string) { // CPF plaintext
    // 21. `userService.findByCpf` lida com o HMAC
    const user = await this.userService.findByCpf(cpf);

    if (user) {
      //checar se a senha corresponde a hash que está no banco
      const isPasswordValid = await bcrypt.compare(senha, user.senha);

      if (isPasswordValid) {
        return {
          ...user,
          senha: undefined,
        };
      }
    }
    //se chegar aqui, significa que o cpf ou senha estao errados
    throw new UnauthorizedException('cpf ou senha incorretos');
  }
}