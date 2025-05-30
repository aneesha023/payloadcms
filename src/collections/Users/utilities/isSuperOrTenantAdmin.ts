import type { Access, PayloadRequest } from 'payload/types'
import { isSuperAdmin } from '../../../utilities/isSuperAdmin'
import { isTenantAdmin } from '../../../utilities/isTenantAdmin'

export const isSuperOrTenantAdmin= ({ req }: { req: PayloadRequest }): boolean => {
  const { user } = req

  if (!user) return false

  // Super admin check
  if (isSuperAdmin(user)) return true

  // Tenant admin check
  if (isTenantAdmin(user)) return true

  // Try to get tenant ID from lastLoggedInTenant
  const tenantID = user.lastLoggedInTenant?.id || user.lastLoggedInTenant

  if (!tenantID) return false

  const tenantWithUser = user.tenants?.find((tenantEntry) => {
    const id = tenantEntry.tenant?.id || tenantEntry.tenant
    return id === tenantID
  })

  return tenantWithUser?.roles?.includes('admin') || false
}
