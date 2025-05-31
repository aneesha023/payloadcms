"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pages = void 0;
var richText_1 = __importDefault(require("../../fields/richText"));
var tenant_1 = require("../../fields/tenant");
var tenantAdmins_1 = require("./access/tenantAdmins");
var formatSlug_1 = __importDefault(require("./hooks/formatSlug"));
exports.Pages = {
    slug: 'pages',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'updatedAt'],
    },
    access: {
        read: tenantAdmins_1.tenantAdmins,
        create: tenantAdmins_1.tenantAdmins,
        update: tenantAdmins_1.tenantAdmins,
        delete: tenantAdmins_1.tenantAdmins,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            label: 'Slug',
            type: 'text',
            index: true,
            admin: {
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [(0, formatSlug_1.default)('title')],
            },
        },
        tenant_1.tenant,
        (0, richText_1.default)(),
    ],
};
//# sourceMappingURL=index.js.map