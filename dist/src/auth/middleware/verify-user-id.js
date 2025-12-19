"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractIdFromToken = extractIdFromToken;
const jwt = require("jsonwebtoken");
function extractIdFromToken(authorization) {
    const token = authorization?.split(' ')[1];
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        throw new Error('Secret key is not defined');
    }
    const decodedToken = jwt.verify(token, secretKey);
    const id = decodedToken['id'];
    return id;
}
//# sourceMappingURL=verify-user-id.js.map