import type { Payload } from 'payload'
// import { lastLoggedInTenant } from '../collections/Pages/access/lastLoggedInTenant'

export const seed = async (payload: Payload): Promise<void> => {
  // Create super admin if not exists
  const existingSuperAdmin = await payload.find({
    collection: 'users',
    where: {
      email: { equals: 'demo@payloadcms.com' },
    },
  })

  if (existingSuperAdmin.totalDocs === 0) {
    await payload.create({
      collection: 'users',
      data: {
        email: 'demo@payloadcms.com',
        password: 'demo',
        roles: ['super-admin'],
      },
    })
    payload.logger.info('✅ Created super admin')
  }

  // Create tenants if not exist
  const getOrCreateTenant = async (name: string, domain: string) => {
    const existing = await payload.find({
      collection: 'tenants',
      where: { name: { equals: name } },
    })

    if (existing.totalDocs > 0) {
      return existing.docs[0]
    }

    const created = await payload.create({
      collection: 'tenants',
      data: {
        name,
        domains: [{ domain }],
      },
    })
    return created
  }

  const abc = await getOrCreateTenant('ABC', 'abc.localhost.com:3000')
  const bbc = await getOrCreateTenant('BBC', 'bbc.localhost.com:3000')

  // Create tenant users/admins if not exist
  const usersToSeed = [
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
  ]

  for (const user of usersToSeed) {
    const existing = await payload.find({
      collection: 'users',
      where: { email: { equals: user.email } },
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'users',
        data: {
          email: user.email,
          password: user.password,
          roles: ['user'],
          tenants: [
            {
              tenant: String(user.tenant),
              roles: user.tenantRoles as ('admin' | 'user')[],
            },
          ],
          lastLoggedInTenant: String(user.tenant), 
        },
      })
      
  }

  // Create pages if not exist
  const pagesToSeed = [
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
  ]

  for (const page of pagesToSeed) {
    const existing = await payload.find({
      collection: 'pages',
      where: {
        title: { equals: page.title },
        'tenant': { equals: page.tenant },
      },
    })

    if (existing.totalDocs === 0) {
      await payload.create({
        collection: 'pages',
        data: {
          title: page.title,
          tenant: page.tenant,
          richText: [{ text: page.text }],
        },
      })
    
    }
  }
}
}