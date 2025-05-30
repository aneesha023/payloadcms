import type { CollectionConfig } from 'payload/types'
import { isSuperOrTenantAdmin } from './Users/utilities/isSuperOrTenantAdmin'

const Forms: CollectionConfig = {
  slug: 'forms',
  admin: {
    useAsTitle: 'title',
  },
  access: {
    read: isSuperOrTenantAdmin,
    update: isSuperOrTenantAdmin,
    delete: isSuperOrTenantAdmin,
    create: isSuperOrTenantAdmin,
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
        read: isSuperOrTenantAdmin,
        create: isSuperOrTenantAdmin,
        update: isSuperOrTenantAdmin,
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
          condition: (_, siblingData) => siblingData.type === 'select',
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
      ({ req, data, operation }) => {
        if (operation === 'create' && !data.tenant && req.user?.lastLoggedInTenant) {
          data.tenant = req.user.lastLoggedInTenant
        }
        return data
      },
    ],
  },
}
export default Forms
