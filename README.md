# Payload Multi-Tenant Example

This example demonstrates how to achieve a multi-tenancy in [Payload](https://github.com/payloadcms/payload). This is a powerful way to vertically scale your application by sharing infrastructure across tenants.

## Quick Start

To spin up this example locally, follow these steps:

1. First clone the repo
1. Then `cd YOUR_PROJECT_REPO && cp .env.example .env`
1. Next `yarn && yarn dev`
1. Now `open http://localhost:3000/admin` to access the admin panel
1. Login with email `demo@payloadcms.com` and password `demo`

That's it! Changes made in `./src` will be reflected in your app. See the [Development](#development) section for more details on how to log in as a tenant.

## Enviroment Variables
| Variable name             | Example                          | Description                                                                                                                   |
|---------------------------|----------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
| DATABASE_URI              | localhost or domain.com/postgres | Location and access method for a specific database.                                                                           |
| DATABASE_URL              | localhost or domain.com/postgres | Location and access method for a specific database.                                                                           |
| NEXT_PUBLIC_SERVER_URL    | localhost or domain.com          | Holds the URL of the server where your Next.js application is hosted.                                                         |
| NODE_ENV                  | production                       | Node.js used to indicate the environment in which the application is running, such as 'development', 'production', or 'test'. |
| PAYLOAD_CONFIG_PATH       | dist/payload.config.js           | Specifies the path to the configuration file for the payload of a specific application or service.                            |
| PAYLOAD_PUBLIC_SERVER_URL | localhost or domain.com          | Holds the public URL of the server where your Payload CMS application is hosted.                                              |
| PAYLOAD_SECRET            | loremipsumdolarsitmurat          | Store a secret key for securing or encrypting data in Payload CMS.                                                            |
| PAYLOAD_SEED              | false                            | Used in Payload CMS to seed the database with initial data for development or testing purposes.                               |
| PAYLOAD_DROP_DATABASE     | false                            | Used in Payload CMS to determine whether to drop (delete) the entire database, typically used during testing or development.  |

## Config files

This is a `tsconfig.json` file, which is a configuration file for a TypeScript project. It specifies the root files and the compiler options required to compile the project.

```json
- `compilerOptions`: This property contains settings that inform the compiler how to compile the code.
  - `target`: Specifies the ECMAScript target version. The target is "es5".
  - `lib`: List of library files to be included in the compilation. It includes DOM, DOM iterable, and ESNext libraries.
  - `allowJs`: Allows JavaScript files to be compiled. It's set to true.
  - `strict`: Enables all strict type-checking options. It's set to false.
  - `esModuleInterop`: Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. It's set to true.
  - `skipLibCheck`: Skips type checking of declaration files. It's set to true.
  - `outDir`: Specifies the output directory for the compiled files. The output directory is "./dist".
  - `rootDir`: Specifies the root directory of input files. The root directory is "./src".
  - `jsx`: Specifies JSX code generation. It's set to "react".
  - `sourceMap`: Generates corresponding '.map' file. It's set to true.
  - `resolveJsonModule`: Includes modules imported with '.json' extension. It's set to true.
  - `paths`: A series of entries which re-map imports to lookup locations relative to the 'baseUrl'.
- `include`: Instructs the compiler to include these files in the compilation process. It includes all TypeScript files in the "src" directory.
- `exclude`: Instructs the compiler to exclude these files from the compilation process. It excludes all files in the "node_modules" directory.
- `ts-node`: This property contains settings for the ts-node, a TypeScript execution engine and REPL for Node.js. The `transpileOnly` option is set to true, which means ts-node will only do transpilation, but not type checking.
```

This is a `tsconfig.server.json` file, which is a configuration file for a TypeScript project. This specific configuration file is extending another `tsconfig.json` file located in the same directory, and it's overriding or adding some additional options.

```json
- `extends`: This property is used to inherit configuration from another `tsconfig.json` file. In this case, it's extending the `tsconfig.json` file in the same directory.

- `compilerOptions`: This property contains settings that inform the compiler how to compile the code.
  - `module`: Specifies the module system for the project. The module system is "commonjs".
  - `outDir`: Specifies the output directory for the compiled files. The output directory is "dist".
  - `noEmit`: Controls if any output files are created. It's set to false, so output files will be created.
  - `jsx`: Specifies JSX code generation. It's set to "react".
  - `sourceMap`: Generates corresponding '.map' file. It's set to true.

- `include`: Instructs the compiler to include these files in the compilation process. It includes "src/server.ts" and "src/payload.config.ts" files.

This configuration is likely used for a server-side part of a project, as it includes a server file and uses CommonJS modules, which are typically used in a Node.js environment.
```

## How it works

A multi-tenant Payload application is a single server that hosts multiple "tenants". Examples of tenants may be your agency's clients, your business conglomerate's organizations, or your SaaS customers.

Each tenant has its own set of users, pages, and other data that is scoped to that tenant. This means that your application will be shared across tenants but the data will be scoped to each tenant. Tenants also run on separate domains entirely, so users are not aware of their tenancy.

### Collections

See the [Collections](https://payloadcms.com/docs/configuration/collections) docs for details on how to extend any of this functionality.

- #### Users

  The `users` collection is auth-enabled and encompass both app-wide and tenant-scoped users based on the value of their `roles` and `tenants` fields. Users with the role `super-admin` can manage your entire application, while users with the _tenant role_ of `admin` have limited access to the platform and can manage only the tenant(s) they are assigned to, see [Tenants](#tenants) for more details.

  For additional help with authentication, see the official [Auth Example](https://github.com/payloadcms/payload/tree/main/examples/auth/cms#readme) or the [Authentication](https://payloadcms.com/docs/authentication/overview#authentication-overview) docs.

- #### Tenants

  A `tenants` collection is used to achieve tenant-based access control. Each user is assigned an array of `tenants` which includes a relationship to a `tenant` and their `roles` within that tenant. You can then scope any document within your application to any of your tenants using a simple [relationship](https://payloadcms.com/docs/fields/relationship) field on the `users` or `pages` collections, or any other collection that your application needs. The value of this field is used to filter documents in the admin panel and API to ensure that users can only access documents that belong to their tenant and are within their role. See [Access Control](#access-control) for more details.

  For more details on how to extend this functionality, see the [Payload Access Control](https://payloadcms.com/docs/access-control/overview) docs.

- #### Pages

  Each page is assigned a `tenant` which is used to control access and scope API requests. Pages that are created by tenants are automatically assigned that tenant based on that user's `lastLoggedInTenant` field.

## Access control

Basic role-based access control is setup to determine what users can and cannot do based on their roles, which are:

- `super-admin`: They can access the Payload admin panel to manage your multi-tenant application. They can see all tenants and make all operations.
- `user`: They can only access the Payload admin panel if they are a tenant-admin, in which case they have a limited access to operations based on their tenant (see below).

This applies to each collection in the following ways:

- `users`: Only super-admins, tenant-admins, and the user themselves can access their profile. Anyone can create a user, but only these admins can delete users. See [Users](#users) for more details.
- `tenants`: Only super-admins and tenant-admins can read, create, update, or delete tenants. See [Tenants](#tenants) for more details.
- `pages`: Everyone can access pages, but only super-admins and tenant-admins can create, update, or delete them.

When a user logs in, a `lastLoggedInTenant` field is saved to their profile. This is done by reading the value of `req.headers.host`, querying for a tenant with a matching `domain`, and verifying that the user is a member of that tenant. This field is then used to automatically assign the tenant to any documents that the user creates, such as pages. Super-admins can also use this field to browse the admin panel as a specific tenant.

> If you have versions and drafts enabled on your pages, you will need to add additional read access control condition to check the user's tenants that prevents them from accessing draft documents of other tenants.

For more details on how to extend this functionality, see the [Payload Access Control](https://payloadcms.com/docs/access-control/overview#access-control) docs.

## CORS

This multi-tenant setup requires an open CORS policy. Since each tenant contains a dynamic list of domains, there's no way to know specifically which domains to whitelist at runtime without significant performance implications. This also means that the `serverURL` is not set, as this scopes all requests to a single domain.

Alternatively, if you know the domains of your tenants ahead of time and these values won't change often, you could simply remove the `domains` field altogether and instead use static values.

For more details on this, see the [CORS](https://payloadcms.com/docs/production/preventing-abuse#cross-origin-resource-sharing-cors) docs.

## Front-end

If you're building a website or other front-end for your tenant, you will need specify the `tenant` in your requests. For example, if you wanted to fetch all pages for the tenant `ABC`, you would make a request to `/api/pages?where[tenant][slug][equals]=abc`.

For a head start on building a website for your tenant(s), check out the official [Website Template](https://github.com/payloadcms/template-website). It includes a page layout builder, preview, SEO, and much more. It is not multi-tenant, though, but you can easily take the concepts from that example and apply them here.

## Development

To spin up this example locally, follow the [Quick Start](#quick-start).

### Seed

On boot, a seed script is included to scaffold a basic database for you to use as an example. This is done by setting the `PAYLOAD_DROP_DATABASE` and `PAYLOAD_SEED` environment variables which are included in the `.env.example` by default. You can remove these from your `.env` to prevent this behavior. You can also freshly seed your project at any time by running `yarn seed`. This seed creates a super-admin user with email `demo@payloadcms.com` and password `demo` along with the following tenants:

- `ABC`
  - Domains:
    - `abc.localhost.com:3000`
  - Users:
    - `admin@abc.com` with role `admin` and password `test`
    - `user@abc.com` with role `user` and password `test`
  - Pages:
    - `ABC Home` with content `Hello, ABC!`
- `BBC`
  - Domains:
    - `bbc.localhost.com:3000`
  - Users:
    - `admin@bbc.com` with role `admin` and password `test`
    - `user@bbc.com` with role `user` and password `test`
  - Pages:
    - `BBC Home` with content `Hello, BBC!`

> NOTICE: seeding the database is destructive because it drops your current database to populate a fresh one from the seed template. Only run this command if you are starting a new project or can afford to lose your current data.

### Hosts file

To fully experience the multi-tenancy of this example locally, your app must run on one of the domains listed in any of your tenant's `domains` field. The simplest way to do this to add the following lines to your hosts file.

```bash
# these domains were provided in the seed script
# if needed, change them based on your own tenant settings
# remember to specify the port number when browsing to these domains
127.0.0.1 abc.localhost.com
127.0.0.1 bbc.localhost.com
```

> On Mac you can find the hosts file at `/etc/hosts`. On Windows, it's at `C:\Windows\System32\drivers\etc\hosts`.

Then you can access your app at `http://abc.localhost.com:3000` and `http://bbc.localhost.com:3000`. Access control will be scoped to the correct tenant based on that user's `tenants`, see [Access Control](#access-control) for more details.

## Production

To run Payload in production, you need to build and serve the Admin panel. To do so, follow these steps:

1. First, invoke the `payload build` script by running `yarn build` or `npm run build` in your project root. This creates a `./build` directory with a production-ready admin bundle.
1. Then, run `yarn serve` or `npm run serve` to run Node in production and serve Payload from the `./build` directory.

### Deployment

The easiest way to deploy your project is to use [Payload Cloud](https://payloadcms.com/new/import), a one-click hosting solution to deploy production-ready instances of your Payload apps directly from your GitHub repo. You can also choose to self-host your app, check out the [Deployment](https://payloadcms.com/docs/production/deployment) docs for more details.

## Questions

If you have any issues or questions, reach out to us on [Discord](https://discord.com/invite/payload) or start a [GitHub discussion](https://github.com/payloadcms/payload/discussions).
