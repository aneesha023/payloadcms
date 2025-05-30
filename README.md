# PayloadCMS Multi-Tenant Project

This is a multi-tenant CMS built using [Payload CMS](https://payloadcms.com/) with support for tenant-specific content management, access control, and custom user roles.

## 🚀 Features

- Multi-tenancy support using `payload-plugin-multi-tenant`
- Form builder integration with `payload-plugin-form-builder`
- Role-based access for:
  - Super Admins
  - Tenant Admins
  - Tenant Users
- Tenant-specific content isolation
- MongoDB or PostgreSQL backend (depending on configuration)
- Ready for deployment on Vercel

## 📁 Project Structure

- `collections/` - Payload CMS collections like users, tenants, forms, submissions
- `access/` - Role-based access control functions
- `seed/` - Database seeding logic for super admin, tenants, and users
- `utilities/` - Helper functions for tenant access and role checks

## 🛠️ Getting Started

### 1. Install dependencies

```bash
npm install
2. Configure environment variables
Create a .env file based on .env.example with your database and configuration.

3. Run the app
bash
Copy code
npm run dev
4. Seed database (optional)
bash
Copy code
npm run seed
🏗️ Deployment
This project is deployable on Vercel.

For Vercel setup:

Create a vercel.json and api/index.js for custom server

Point Vercel to api/index.js as the entrypoint

Set up environment variables in Vercel dashboard

🔐 Access Roles
super-admin – Full control across all tenants

tenant-admin – Control over their tenant's content and users

tenant-user – Limited to content within their assigned tenant

👩‍💻 Author
Made by G. Aneesha Varma

🧾 License
MIT – free for personal or commercial use.