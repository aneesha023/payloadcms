import { webpackBundler } from '@payloadcms/bundler-webpack'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import { buildConfig } from 'payload/config'

import { Pages } from './collections/Pages'
import { Tenants } from './collections/Tenants'
import { Users } from './collections/Users'
import Forms from './collections/Forms';
import FormSubmissions from './collections/FormSubmissions';

export default buildConfig({
  collections: [Users, Tenants, Pages, Forms, FormSubmissions],
  admin: {
    bundler: webpackBundler(),
    webpack: config => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          dotenv: path.resolve(__dirname, './dotenv.js'),
        },
      },
    }),
  },
  editor: slateEditor({}),
  db: postgresAdapter({
  pool: {
    connectionString: process.env.DATABASE_URI,
    // Remove SSL here if it causes error; instead include SSL in DATABASE_URI
  },
}),


  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
