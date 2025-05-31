"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isSuperOrTenantAdmin_1 = require("./Users/utilities/isSuperOrTenantAdmin");
var FormSubmissions = {
    slug: 'form-submissions',
    admin: {
        useAsTitle: 'id',
    },
    access: {
        read: isSuperOrTenantAdmin_1.isSuperOrTenantAdmin,
        update: isSuperOrTenantAdmin_1.isSuperOrTenantAdmin,
        delete: isSuperOrTenantAdmin_1.isSuperOrTenantAdmin,
        create: isSuperOrTenantAdmin_1.isSuperOrTenantAdmin,
    },
    fields: [
        {
            name: 'form',
            type: 'relationship',
            relationTo: 'forms',
            required: true,
        },
        {
            name: 'data',
            type: 'json',
            required: true,
        },
        {
            name: 'tenant',
            type: 'relationship',
            relationTo: 'tenants',
            required: true,
            access: {
                read: isSuperOrTenantAdmin_1.isSuperOrTenantAdmin,
                create: isSuperOrTenantAdmin_1.isSuperOrTenantAdmin,
                update: isSuperOrTenantAdmin_1.isSuperOrTenantAdmin,
            },
            admin: {
                position: 'sidebar',
            },
        },
    ],
    hooks: {
        beforeChange: [
            function (_a) {
                var _b;
                var req = _a.req, data = _a.data, operation = _a.operation;
                if (operation === 'create' && !data.tenant && ((_b = req.user) === null || _b === void 0 ? void 0 : _b.lastLoggedInTenant)) {
                    data.tenant = req.user.lastLoggedInTenant;
                }
                return data;
            },
        ],
    },
};
exports.default = FormSubmissions;
//# sourceMappingURL=FormSubmissions.js.map