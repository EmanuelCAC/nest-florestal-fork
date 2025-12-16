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
exports.AutoInfracaoController = void 0;
const common_1 = require("@nestjs/common");
const autoInfracao_service_1 = require("./autoInfracao.service");
const create_relatorio_dto_1 = require("./dto/create-relatorio.dto");
let AutoInfracaoController = class AutoInfracaoController {
    autoInfracaoService;
    constructor(autoInfracaoService) {
        this.autoInfracaoService = autoInfracaoService;
    }
    getExemploCaso() {
        return this.autoInfracaoService.getExemplosDeCasos();
    }
    createRelatorio(body, req) {
        return this.autoInfracaoService.createRelatorio(body, req.user);
    }
};
exports.AutoInfracaoController = AutoInfracaoController;
__decorate([
    (0, common_1.Get)('exemploCaso'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AutoInfracaoController.prototype, "getExemploCaso", null);
__decorate([
    (0, common_1.Post)('relatorio'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_relatorio_dto_1.CreateRelatorioDto, Object]),
    __metadata("design:returntype", void 0)
], AutoInfracaoController.prototype, "createRelatorio", null);
exports.AutoInfracaoController = AutoInfracaoController = __decorate([
    (0, common_1.Controller)('autoinfracao'),
    __metadata("design:paramtypes", [autoInfracao_service_1.AutoInfracaoService])
], AutoInfracaoController);
//# sourceMappingURL=autoInfracao.controller.js.map