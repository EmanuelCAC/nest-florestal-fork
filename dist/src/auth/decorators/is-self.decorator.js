"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsSelf = exports.IS_SELF_KEY = void 0;
const common_1 = require("@nestjs/common");
exports.IS_SELF_KEY = 'isSelf';
const IsSelf = () => (0, common_1.SetMetadata)(exports.IS_SELF_KEY, true);
exports.IsSelf = IsSelf;
//# sourceMappingURL=is-self.decorator.js.map