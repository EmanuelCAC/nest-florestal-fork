import { IsNumber, IsString } from "class-validator";

export class CreateAutoInfracaoDto {

    @IsString()
    data: string;

    @IsString()
    cpf?: string;

    @IsNumber()
    id_exemplocaso: number;

    @IsString()
    descricao: string;

    @IsNumber()
    relatoriodiario_id?: number;
}
