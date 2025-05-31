"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSuperOrTenantAdmin = void 0;
var isSuperAdmin_1 = require("../../../utilities/isSuperAdmin");
var isTenantAdmin_1 = require("../../../utilities/isTenantAdmin");
var isSuperOrTenantAdmin = function (_a) {
    var _b, _c, _d;
    var req = _a.req;
    var user = req.user;
    if (!user)
        return false;
    // Super admin check
    if ((0, isSuperAdmin_1.isSuperAdmin)(user))
        return true;
    // Tenant admin check
    if ((0, isTenantAdmin_1.isTenantAdmin)(user))
        return true;
    // Try to get tenant ID from lastLoggedInTenant
    var tenantID = ((_b = user.lastLoggedInTenant) === null || _b === void 0 ? void 0 : _b.id) || user.lastLoggedInTenant;
    if (!tenantID)
        return false;
    var tenantWithUser = (_c = user.tenants) === null || _c === void 0 ? void 0 : _c.find(function (tenantEntry) {
        var _a;
        var id = ((_a = tenantEntry.tenant) === null || _a === void 0 ? void 0 : _a.id) || tenantEntry.tenant;
        return id === tenantID;
    });
    return ((_d = tenantWithUser === null || tenantWithUser === void 0 ? void 0 : tenantWithUser.roles) === null || _d === void 0 ? void 0 : _d.includes('admin')) || false;
};
exports.isSuperOrTenantAdmin = isSuperOrTenantAdmin;
//# sourceMappingURL=isSuperOrTenantAdmin.js.map