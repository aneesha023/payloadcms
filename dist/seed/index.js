"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
// import { lastLoggedInTenant } from '../collections/Pages/access/lastLoggedInTenant'
var seed = function (payload) { return __awaiter(void 0, void 0, void 0, function () {
    var existingSuperAdmin, getOrCreateTenant, abc, bbc, usersToSeed, _i, usersToSeed_1, user, existing, pagesToSeed, _a, pagesToSeed_1, page, existing_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, payload.find({
                    collection: 'users',
                    where: {
                        email: { equals: 'demo@payloadcms.com' },
                    },
                })];
            case 1:
                existingSuperAdmin = _b.sent();
                if (!(existingSuperAdmin.totalDocs === 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, payload.create({
                        collection: 'users',
                        data: {
                            email: 'demo@payloadcms.com',
                            password: 'demo',
                            roles: ['super-admin'],
                        },
                    })];
            case 2:
                _b.sent();
                payload.logger.info('✅ Created super admin');
                _b.label = 3;
            case 3:
                getOrCreateTenant = function (name, domain) { return __awaiter(void 0, void 0, void 0, function () {
                    var existing, created;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, payload.find({
                                    collection: 'tenants',
                                    where: { name: { equals: name } },
                                })];
                            case 1:
                                existing = _a.sent();
                                if (existing.totalDocs > 0) {
                                    return [2 /*return*/, existing.docs[0]];
                                }
                                return [4 /*yield*/, payload.create({
                                        collection: 'tenants',
                                        data: {
                                            name: name,
                                            domains: [{ domain: domain }],
                                        },
                                    })];
                            case 2:
                                created = _a.sent();
                                return [2 /*return*/, created];
                        }
                    });
                }); };
                return [4 /*yield*/, getOrCreateTenant('ABC', 'abc.localhost.com:3000')];
            case 4:
                abc = _b.sent();
                return [4 /*yield*/, getOrCreateTenant('BBC', 'bbc.localhost.com:3000')
                    // Create tenant users/admins if not exist
                ];
            case 5:
                bbc = _b.sent();
                usersToSeed = [
                    {
                        email: 'admin@abc.com',
                        password: 'test',
                        tenant: abc.id,
                        tenantRoles: ['admin'],
                    },
                    {
                        email: 'user@abc.com',
                        password: 'test',
                        tenant: abc.id,
                        tenantRoles: ['user'],
                    },
                    {
                        email: 'admin@bbc.com',
                        password: 'test',
                        tenant: bbc.id,
                        tenantRoles: ['admin'],
                    },
                    {
                        email: 'user@bbc.com',
                        password: 'test',
                        tenant: bbc.id,
                        tenantRoles: ['user'],
                        lastLoggedInTenant: bbc.id,
                    },
                ];
                _i = 0, usersToSeed_1 = usersToSeed;
                _b.label = 6;
            case 6:
                if (!(_i < usersToSeed_1.length)) return [3 /*break*/, 15];
                user = usersToSeed_1[_i];
                return [4 /*yield*/, payload.find({
                        collection: 'users',
                        where: { email: { equals: user.email } },
                    })];
            case 7:
                existing = _b.sent();
                if (!(existing.totalDocs === 0)) return [3 /*break*/, 9];
                return [4 /*yield*/, payload.create({
                        collection: 'users',
                        data: {
                            email: user.email,
                            password: user.password,
                            roles: ['user'],
                            tenants: [
                                {
                                    tenant: String(user.tenant),
                                    roles: user.tenantRoles,
                                },
                            ],
                            lastLoggedInTenant: String(user.tenant),
                        },
                    })];
            case 8:
                _b.sent();
                _b.label = 9;
            case 9:
                pagesToSeed = [
                    {
                        title: 'ABC Home',
                        tenant: String(abc.id),
                        text: 'Hello, ABC!',
                    },
                    {
                        title: 'BBC Home',
                        tenant: String(bbc.id),
                        text: 'Hello, BBC!',
                    },
                ];
                _a = 0, pagesToSeed_1 = pagesToSeed;
                _b.label = 10;
            case 10:
                if (!(_a < pagesToSeed_1.length)) return [3 /*break*/, 14];
                page = pagesToSeed_1[_a];
                return [4 /*yield*/, payload.find({
                        collection: 'pages',
                        where: {
                            title: { equals: page.title },
                            'tenant': { equals: page.tenant },
                        },
                    })];
            case 11:
                existing_1 = _b.sent();
                if (!(existing_1.totalDocs === 0)) return [3 /*break*/, 13];
                return [4 /*yield*/, payload.create({
                        collection: 'pages',
                        data: {
                            title: page.title,
                            tenant: page.tenant,
                            richText: [{ text: page.text }],
                        },
                    })];
            case 12:
                _b.sent();
                _b.label = 13;
            case 13:
                _a++;
                return [3 /*break*/, 10];
            case 14:
                _i++;
                return [3 /*break*/, 6];
            case 15: return [2 /*return*/];
        }
    });
}); };
exports.seed = seed;
//# sourceMappingURL=index.js.map