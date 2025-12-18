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
exports.CreateRelatorioDto = exports.tipoVeiculoAbordado = exports.setores = exports.municipios = exports.origem = exports.equipe = exports.tipo_acao = void 0;
const class_validator_1 = require("class-validator");
var tipo_acao;
(function (tipo_acao) {
    tipo_acao["incursao_viatura"] = "incursao_viatura";
    tipo_acao["incrusao_pe"] = "incrusao_pe";
    tipo_acao["fiscalizacao_embarcada"] = "fiscalizacao_embarcada";
    tipo_acao["sobrevoo"] = "sobrevoo";
    tipo_acao["fiscalizacao_drone"] = "fiscalizacao_drone";
    tipo_acao["bloqueio"] = "bloqueio";
})(tipo_acao || (exports.tipo_acao = tipo_acao = {}));
var equipe;
(function (equipe) {
    equipe["charlie_sede_diurno"] = "charlie_sede_diurno";
    equipe["charlie_rp_diurno"] = "charlie_rp_diurno";
    equipe["charlie_rp_noturno"] = "charlie_rp_noturno";
    equipe["delta_sede_diurno"] = "delta_sede_diurno";
    equipe["delta_rp_diurno"] = "delta_rp_diurno";
    equipe["delta_rp_noturno"] = "delta_rp_noturno";
})(equipe || (exports.equipe = equipe = {}));
var origem;
(function (origem) {
    origem["rotina"] = "rotina";
    origem["planejamento_SIMUC"] = "planejamento_SIMUC";
    origem["dejem_SIMUC"] = "dejem_SIMUC";
    origem["denuncia"] = "denuncia";
    origem["atendimento_orgaos_externos"] = "atendimento_orgaos_externos";
    origem["demanda_soliitacao_inerna"] = "demanda_soliitacao_inerna";
})(origem || (exports.origem = origem = {}));
var municipios;
(function (municipios) {
    municipios["caraguatatuba"] = "caraguatatuba";
    municipios["paraibuna"] = "paraibuna";
    municipios["natividade_da_serra"] = "natividade_da_serra";
})(municipios || (exports.municipios = municipios = {}));
var setores;
(function (setores) {
    setores["caraguatatuba_norte"] = "caraguatatuba_norte";
    setores["caraguatatuba_sul"] = "caraguatatuba_sul";
    setores["alto_da_serra_norte"] = "alto_da_serra_norte";
    setores["alto_da_serra_sul"] = "alto_da_serra_sul";
})(setores || (exports.setores = setores = {}));
var tipoVeiculoAbordado;
(function (tipoVeiculoAbordado) {
    tipoVeiculoAbordado["carro"] = "carro";
    tipoVeiculoAbordado["moto"] = "moto";
    tipoVeiculoAbordado["caminhao"] = "caminhao";
    tipoVeiculoAbordado["onibusVan"] = "onibusVan";
})(tipoVeiculoAbordado || (exports.tipoVeiculoAbordado = tipoVeiculoAbordado = {}));
class CreateRelatorioDto {
    equipe;
    equipe_em_atuacao;
    orgaos_e_instituicoes_envolvadas;
    responsavel;
    data_hora_inicio_acao;
    data_hora_termino_acao;
    origem;
    registro_ocorrencia;
    area_fiscalizada;
    municipios;
    setores;
    especificacao_local;
    relatorio;
    outras_atividades;
    coordenadas;
    placa_vtr;
    km_inicio;
    km_final;
    condicoes_vtr;
    tipo_acao;
    veiculos_abordados;
    tipo_veiculo_abordado;
    descricao_veiculos;
    km_percorrido;
    horas_percorridas;
    autoinfracao;
}
exports.CreateRelatorioDto = CreateRelatorioDto;
__decorate([
    (0, class_validator_1.IsEnum)(equipe),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "equipe", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "equipe_em_atuacao", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "orgaos_e_instituicoes_envolvadas", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "responsavel", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "data_hora_inicio_acao", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "data_hora_termino_acao", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(origem),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "origem", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRelatorioDto.prototype, "registro_ocorrencia", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRelatorioDto.prototype, "area_fiscalizada", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(municipios),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "municipios", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(setores),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "setores", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "especificacao_local", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "relatorio", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "outras_atividades", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "coordenadas", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "placa_vtr", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "km_inicio", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "km_final", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "condicoes_vtr", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(tipo_acao),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "tipo_acao", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "veiculos_abordados", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(tipoVeiculoAbordado),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "tipo_veiculo_abordado", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "descricao_veiculos", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "km_percorrido", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRelatorioDto.prototype, "horas_percorridas", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateRelatorioDto.prototype, "autoinfracao", void 0);
//# sourceMappingURL=create-relatorio.dto.js.map