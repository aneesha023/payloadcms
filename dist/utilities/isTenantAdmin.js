"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isTenantAdmin = void 0;
var isTenantAdmin = function (user) { return user.tenants[0].roles.includes('admin'); };
exports.isTenantAdmin = isTenantAdmin;
//# sourceMappingURL=isTenantAdmin.js.map