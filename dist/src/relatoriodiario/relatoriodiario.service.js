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
exports.RelatoriodiarioService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let RelatoriodiarioService = class RelatoriodiarioService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findUnprocessedWithRelations() {
        return this.prisma.relatoriodiario.findMany({
            where: {
                processado: false,
            },
            include: {
                autoinfracao: true,
            },
            orderBy: {
                data_hora_inicio_acao: 'asc',
            },
        });
    }
    async markAsProcessed(id) {
        const relatorio = await this.prisma.relatoriodiario.findUnique({
            where: { id },
        });
        if (!relatorio) {
            throw new common_1.NotFoundException(`Relatório diário com ID ${id} não encontrado`);
        }
        return this.prisma.relatoriodiario.update({
            where: { id },
            data: {
                processado: true,
            },
            include: {
                autoinfracao: true,
            },
        });
    }
};
exports.RelatoriodiarioService = RelatoriodiarioService;
exports.RelatoriodiarioService = RelatoriodiarioService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RelatoriodiarioService);
//# sourceMappingURL=relatoriodiario.service.js.map