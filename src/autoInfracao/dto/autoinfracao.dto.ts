import { isString, Length, Matches } from "class-validator";
import { ExemploCasoDto } from "./exemploCaso.dto";

export class AutoInfracaoDto {

    
    data_emissao: Date;

    @Matches(/^\d+$/, { message: 'CPF deve conter apenas números'})
    @Length(11, 11, { message: 'CPF deve conter 11 números'})
    cpf: string;


    latitude: number;
    longitude: number;
    id_exemplocaso: number;
    descricao: string;
    fiscal:string;
    exemploCaso: ExemploCasoDto;
}   