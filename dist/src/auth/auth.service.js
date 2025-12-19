"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma/prisma.service");
const verify_user_id_1 = require("./middleware/verify-user-id");
const user_entity_1 = require("../user/entities/user.entity");
let AuthService = class AuthService {
    userService;
    jwtService;
    prisma;
    constructor(userService, jwtService, prisma) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async signup(user) {
        const hashedCpf = await bcrypt.hash(user.cpf, 10);
        const userExists = await this.prisma.fiscal.findUnique({
            where: { cpf: hashedCpf },
        });
        if (userExists) {
            throw new Error('Usuário já existe');
        }
        const hashedPassword = await bcrypt.hash(user.senha, 10);
        const newUser = await this.prisma.fiscal.create({
            data: {
                cpf: hashedCpf,
                nome: user.nome,
                senha: hashedPassword,
                tipo: user_entity_1.tipo_usuario[user.tipo],
            },
        });
        if (!newUser) {
            throw new Error('Erro ao criar o usuário');
        }
        const payload = {
            id: newUser.id,
            nome: user.nome,
            tipo: user.tipo,
        };
        const token = this.jwtService.sign(payload);
        return {
            status: 'success',
            message: 'Usuário registrado com sucesso!',
            token,
        };
    }
    async login(user) {
        const hashedCpf = await bcrypt.hash(user.cpf, 10);
        const verifyUser = await this.prisma.fiscal.findUnique({
            where: { cpf: hashedCpf },
        });
        if (!verifyUser)
            throw new common_1.NotFoundException('Usuário nao encontrado');
        const isPasswordValid = await bcrypt.compare(user.senha, verifyUser.senha);
        if (!isPasswordValid)
            throw new common_1.UnauthorizedException('senha incorreta');
        const payload = {
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
    async updatePassword(id, currentPassword, newPassword, newPasswordConfirm) {
        const user = await this.userService.findById(id);
        if (!user)
            throw new common_1.NotFoundException('Usuário não encontrado');
        const passwordMatches = await bcrypt.compare(currentPassword, user.senha);
        if (!passwordMatches) {
            throw new common_1.BadRequestException('senha atual incorreta');
        }
        if (newPassword !== newPasswordConfirm) {
            throw new common_1.BadRequestException('senhas nao conferem');
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await this.prisma.fiscal.update({
            where: { id: user.id },
            data: { senha: hashedNewPassword },
        });
        return { status: 'success', message: 'senha atualizada com sucesso' };
    }
    async updateOwnPassword(password, passwordConfirm, cpf) {
        const user = await this.userService.findByCpf(cpf);
        if (!user)
            throw new common_1.NotFoundException('Usuário nao encontrado');
        if (password !== passwordConfirm) {
            throw new common_1.BadRequestException('senhas nao conferem');
        }
        const hashedNewPassword = await bcrypt.hash(password, 10);
        await this.prisma.fiscal.update({
            where: { id: user.id },
            data: { senha: hashedNewPassword },
        });
        return { status: 'success', message: 'senha atualizada com sucesso' };
    }
    async updateAnyPassword(adminPassword, targetcpf, newPassword) {
        const user = await this.userService.findByCpf(targetcpf);
        if (!user) {
            throw new common_1.NotFoundException('Usuário não encontrado');
        }
        const adminId = verify_user_id_1.extractIdFromToken['id'];
        const adminUser = await this.userService.findById(adminId);
        if (!adminUser) {
            throw new common_1.NotFoundException('Administrador não encontrado');
        }
        const passwordMatches = await bcrypt.compare(adminPassword, adminUser.senha);
        if (!passwordMatches) {
            throw new common_1.BadRequestException('senha do administrador incorreta');
        }
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.senha = hashedNewPassword;
        await this.prisma.fiscal.update({
            where: { id: user.id },
            data: { senha: hashedNewPassword },
        });
        return { status: 'success', message: 'senha alterada com sucesso' };
    }
    async deleteUserByCpf(cpf) {
        const user = await this.userService.findByCpf(cpf);
        if (!user) {
            return { message: 'Usuário nao encontrado' };
        }
        await this.prisma.fiscal.delete({ where: { id: user.id } });
        return { status: 'success', message: 'Usuário excluido com sucesso' };
    }
    async validateUser(cpf, senha) {
        const user = await this.userService.findByCpf(cpf);
        if (user) {
            const isPasswordValid = await bcrypt.compare(senha, user.senha);
            if (isPasswordValid) {
                return {
                    ...user,
                    senha: undefined,
                };
            }
        }
        throw new common_1.UnauthorizedException('cpf ou senha incorretos');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map