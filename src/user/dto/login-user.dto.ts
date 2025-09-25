import { IsDefined, Length, Matches } from "class-validator";

export class LoginUserDto {

    @IsDefined({ message: 'CPF é obrigatório' })
    cpf: string;

    @IsDefined({ message: 'Senha é obrigatória' })
    senha: string;
}