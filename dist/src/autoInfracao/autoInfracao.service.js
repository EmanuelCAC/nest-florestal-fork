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
exports.AutoInfracaoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AutoInfracaoService = class AutoInfracaoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getExemplosDeCasos() {
        const exemploDeCasos = await this.prisma.exemplocaso.findMany();
        return exemploDeCasos;
    }
    convertToISO8601(dateString) {
        if (!dateString || typeof dateString !== 'string') {
            throw new Error('Invalid date string');
        }
        dateString = dateString.replace(',', '').trim();
        const parts = dateString.split(' ');
        if (parts.length !== 2) {
            throw new Error('Date must be in format DD/MM/YYYY HH:MM');
        }
        const [datePart, timePart] = parts;
        const dateParts = datePart.split('/');
        const timeParts = timePart.split(':');
        if (dateParts.length !== 3 || timeParts.length !== 2) {
            throw new Error('Invalid date format');
        }
        const [day, month, year] = dateParts.map(p => parseInt(p, 10));
        const [hour, minute] = timeParts.map(p => parseInt(p, 10));
        if ([day, month, year, hour, minute].some(isNaN)) {
            throw new Error('Date contains non-numeric values');
        }
        if (day < 1 || day > 31 ||
            month < 1 || month > 12 ||
            hour < 0 || hour > 23 ||
            minute < 0 || minute > 59) {
            throw new Error('Date contains out-of-range values');
        }
        return new Date(year, month - 1, day, hour, minute);
    }
    async createRelatorio(body, requisicao) {
        const fiscal = await this.prisma.fiscal.findUnique({
            where: { id: requisicao.id },
        });
        if (!fiscal) {
            throw new Error('Fiscal nao autenticado');
        }
        const { autoinfracao, data_hora_inicio_acao, data_hora_termino_acao, ...rest } = body;
        const dataHoraInicioISO = this.convertToISO8601(data_hora_inicio_acao);
        const dataHoraTerminoISO = this.convertToISO8601(data_hora_termino_acao);
        const relatorio = await this.prisma.relatoriodiario.create({
            data: {
                ...rest,
                data_hora_inicio_acao: dataHoraInicioISO,
                data_hora_termino_acao: dataHoraTerminoISO,
                fiscalId: fiscal.id,
            },
        });
        if (autoinfracao) {
            await this.prisma.autoinfracao.createMany({
                data: autoinfracao.map((auto) => ({
                    id_exemplocaso: auto.id_exemplocaso,
                    descricao: auto.descricao,
                    data_emissao: this.convertToISO8601(auto.data),
                    id_fiscal: fiscal.id,
                    relatoriodiarioId: relatorio.id,
                })),
            });
        }
        return { status: 'success', message: 'Relatório criado com sucesso' };
    }
};
exports.AutoInfracaoService = AutoInfracaoService;
exports.AutoInfracaoService = AutoInfracaoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AutoInfracaoService);
//# sourceMappingURL=autoInfracao.service.js.map