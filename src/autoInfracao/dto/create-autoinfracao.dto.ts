import { IsNumber, IsString } from "class-validator";

export class CreateAutoInfracaoDto {

    @IsString()
    data: string;

    @IsNumber()
    id_exemplocaso: number;

    @IsString()
    descricao: string;
}
