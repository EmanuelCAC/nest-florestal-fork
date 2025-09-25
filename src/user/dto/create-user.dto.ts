import { IsIn, IsString, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @Matches(/^\d+$/, { message: 'CPF deve conter apenas números' })
  @Length(11, 11, { message: 'CPF deve conter 11 números' })
  cpf: string;

  @IsString()
  nome: string;

  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial',
  })
  senha: string;

  @IsString()
  tipo: string;
}
