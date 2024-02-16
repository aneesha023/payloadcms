import type { CollectionConfig } from 'payload/types'

import richText from '../../fields/richText'
import { tenant } from '../../fields/tenant'
import { tenantAdmins } from './access/tenantAdmins'
import formatSlug from './hooks/formatSlug'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  access: {
    read: tenantAdmins,
    create: tenantAdmins,
    update: tenantAdmins,
    delete: tenantAdmins,
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
        beforeValidate: [formatSlug('title')],
      },
    },
    tenant,
    richText(),
  ],
}
