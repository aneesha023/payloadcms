import { User } from '../payload-types'

export const isTenantAdmin = (user: User): boolean => user.tenants[0].roles.includes('admin')
