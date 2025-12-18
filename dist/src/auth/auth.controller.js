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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const local_auth_guard_1 = require("./guards/local-auth.guard");
const is_public_decorator_1 = require("./decorators/is-public.decorator");
const is_self_decorator_1 = require("./decorators/is-self.decorator");
const is_admin_decorator_1 = require("./decorators/is-admin.decorator");
const admin_guard_1 = require("./guards/admin.guard");
const login_user_dto_1 = require("../user/dto/login-user.dto");
const create_user_dto_1 = require("../user/dto/create-user.dto");
const user_entity_1 = require("../user/entities/user.entity");
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    signup(user) {
        return this.authService.signup({
            ...user,
            tipo: user_entity_1.tipo_usuario[user.tipo],
        });
    }
    login(loginDto) {
        return this.authService.login(loginDto);
    }
    profile(req) {
        return req.user;
    }
    async resetPassword(body, req) {
        return this.authService.updatePassword(req.user.id, body.senhaAntiga, body.novaSenha, body.confirmaSenha);
    }
    async updatePassword(body) {
        if (!body.cpf) {
            throw new common_1.BadRequestException('CPF é obrigatório para esta operação');
        }
        return this.authService.updateOwnPassword(body.novaSenha, body.confirmaSenha, body.cpf);
    }
    async updateAnyPassword(body) {
        if (!body.senhaAdm || !body.cpf) {
            throw new common_1.BadRequestException('Senha do administrador e CPF são obrigatórios');
        }
        return this.authService.updateAnyPassword(body.senhaAdm, body.cpf, body.novaSenha);
    }
    async deleteUser(req) {
        return await this.authService.deleteUserByCpf(req.cpf);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, is_public_decorator_1.IsPublic)(),
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "signup", null);
__decorate([
    (0, common_1.Post)('signin'),
    (0, is_public_decorator_1.IsPublic)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginUserDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "login", null);
__decorate([
    (0, common_1.Get)('profile'),
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "profile", null);
__decorate([
    (0, is_self_decorator_1.IsSelf)(),
    (0, common_1.Put)('updatePassword'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Put)('reset'),
    (0, is_admin_decorator_1.IsAdmin)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePassword", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, common_1.Put)('resetAny'),
    (0, is_admin_decorator_1.IsAdmin)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updateAnyPassword", null);
__decorate([
    (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
    (0, is_admin_decorator_1.IsAdmin)(),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "deleteUser", null);
exports.AuthController = AuthController = __decorate([
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map