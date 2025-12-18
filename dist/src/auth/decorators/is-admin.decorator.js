"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsAdmin = exports.IS_ADMIN_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IS_ADMIN_KEY = 'isAdmin';
const IsAdmin = () => (0, common_1.SetMetadata)(exports.IS_ADMIN_KEY, true);
exports.IsAdmin = IsAdmin;
//# sourceMappingURL=is-admin.decorator.js.map