import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';

@Injectable()
//o passport usa a estratégia local para autenticação realizando a comparação de cpf e senha
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({ usernameField: 'cpf', passwordField: 'senha' }); //padrão do passport local
    }

    //extrai informação do body e passa para o authService
    validate(cpf: string, password: string) {
        
        return this.authService.validateUser(cpf, password);
    }
}