"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractCpfFromToken = extractCpfFromToken;
const jwt = require("jsonwebtoken");
function extractCpfFromToken(authorization) {
    const token = authorization?.split(' ')[1];
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        throw new Error('Secret key is not defined');
    }
    const decodedToken = jwt.verify(token, secretKey);
    const cpf = decodedToken['cpf'];
    return cpf;
}
//# sourceMappingURL=verify-cpf.js.map