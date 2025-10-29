export enum tipo_usuario {
  Campo = 'Campo',
  Administrativo = 'Administrativo',
  Admin = 'Admin',
}

export class User {
  cpf: string;
  nome: string;
  senha: string;
  tipo: tipo_usuario;
}
