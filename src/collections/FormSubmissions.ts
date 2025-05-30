import type { CollectionConfig } from 'payload/types'
import { isSuperOrTenantAdmin } from './Users/utilities/isSuperOrTenantAdmin'

const FormSubmissions: CollectionConfig = {
  slug: 'form-submissions',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    read: isSuperOrTenantAdmin,
    update: isSuperOrTenantAdmin,
    delete: isSuperOrTenantAdmin,
    create: isSuperOrTenantAdmin,
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
        read: isSuperOrTenantAdmin,
        create: isSuperOrTenantAdmin,
        update: isSuperOrTenantAdmin,
      },
      admin: {
        position: 'sidebar',
      },
    },
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
export default FormSubmissions
