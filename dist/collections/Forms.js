"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isSuperOrTenantAdmin_1 = require("./Users/utilities/isSuperOrTenantAdmin");
var Forms = {
    slug: 'forms',
    admin: {
        useAsTitle: 'title',
    },
    access: {
        read: isSuperOrTenantAdmin_1.isSuperOrTenantAdmin,
        update: isSuperOrTenantAdmin_1.isSuperOrTenantAdmin,
        delete: isSuperOrTenantAdmin_1.isSuperOrTenantAdmin,
        create: isSuperOrTenantAdmin_1.isSuperOrTenantAdmin,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
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
        {
            name: 'fields',
            label: 'Form Fields',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'type',
                    type: 'select',
                    required: true,
                    options: [
                        { label: 'Text', value: 'text' },
                        { label: 'Email', value: 'email' },
                        { label: 'Number', value: 'number' },
                        { label: 'Textarea', value: 'textarea' },
                        { label: 'Checkbox', value: 'checkbox' },
                        { label: 'Select', value: 'select' },
                    ],
                },
                {
                    name: 'required',
                    type: 'checkbox',
                    label: 'Required?',
                },
                {
                    name: 'options',
                    type: 'array',
                    label: 'Select Options',
                    admin: {
                        condition: function (_, siblingData) { return siblingData.type === 'select'; },
                    },
                    fields: [
                        {
                            name: 'label',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'value',
                            type: 'text',
                            required: true,
                        },
                    ],
                },
            ],
        }
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
exports.default = Forms;
//# sourceMappingURL=Forms.js.map