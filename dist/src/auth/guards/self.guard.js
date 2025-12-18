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
exports.SelfGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt = require("jsonwebtoken");
const is_self_decorator_1 = require("../decorators/is-self.decorator");
let SelfGuard = class SelfGuard {
    reflector;
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const isSelfRequired = this.reflector.getAllAndOverride(is_self_decorator_1.IS_SELF_KEY, [context.getHandler(), context.getClass()]);
        if (!isSelfRequired) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        const authorization = request.headers['authorization'];
        const token = authorization.split(' ')[1];
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            throw new Error('error: secretKey is not defined');
        }
        const decodedToken = jwt.verify(token, secretKey);
        if (decodedToken['cpf'] !== request.params.cpf) {
            return false;
        }
        return true;
    }
};
exports.SelfGuard = SelfGuard;
exports.SelfGuard = SelfGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], SelfGuard);
//# sourceMappingURL=self.guard.js.map