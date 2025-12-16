"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.tipo_usuario = void 0;
var tipo_usuario;
(function (tipo_usuario) {
    tipo_usuario["Campo"] = "Campo";
    tipo_usuario["Administrativo"] = "Administrativo";
    tipo_usuario["Admin"] = "Admin";
})(tipo_usuario || (exports.tipo_usuario = tipo_usuario = {}));
class User {
    id;
    cpf;
    nome;
    senha;
    tipo;
}
exports.User = User;
//# sourceMappingURL=user.entity.js.map