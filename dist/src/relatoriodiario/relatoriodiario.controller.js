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
exports.RelatoriodiarioController = void 0;
const common_1 = require("@nestjs/common");
const relatoriodiario_service_1 = require("./relatoriodiario.service");
const passport_1 = require("@nestjs/passport");
const admin_guard_1 = require("../auth/guards/admin.guard");
const is_admin_decorator_1 = require("../auth/decorators/is-admin.decorator");
let RelatoriodiarioController = class RelatoriodiarioController {
    relatoriodiarioService;
    constructor(relatoriodiarioService) {
        this.relatoriodiarioService = relatoriodiarioService;
    }
    findUnprocessed() {
        return this.relatoriodiarioService.findUnprocessedWithRelations();
    }
    markAsProcessed(id) {
        return this.relatoriodiarioService.markAsProcessed(+id);
    }
};
exports.RelatoriodiarioController = RelatoriodiarioController;
__decorate([
    (0, common_1.Get)('nao-processados'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), admin_guard_1.AdminGuard),
    (0, is_admin_decorator_1.IsAdmin)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RelatoriodiarioController.prototype, "findUnprocessed", null);
__decorate([
    (0, common_1.Post)(':id/processar'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('jwt'), admin_guard_1.AdminGuard),
    (0, is_admin_decorator_1.IsAdmin)(),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RelatoriodiarioController.prototype, "markAsProcessed", null);
exports.RelatoriodiarioController = RelatoriodiarioController = __decorate([
    (0, common_1.Controller)('relatorios-diarios'),
    __metadata("design:paramtypes", [relatoriodiario_service_1.RelatoriodiarioService])
], RelatoriodiarioController);
//# sourceMappingURL=relatoriodiario.controller.js.map