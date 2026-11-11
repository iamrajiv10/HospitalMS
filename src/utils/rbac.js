import { ROLES, ROLE_PERMISSIONS } from '../config/roles';

/**
 * Checks if a user has a specific role
 */
export const hasRole = (user, allowedRoles = []) => {
  if (!user || !user.role) return false;
  if (!allowedRoles || allowedRoles.length === 0) return true;
  return allowedRoles.includes(user.role);
};

/**
 * Checks if a user has a specific permission
 */
export const hasPermission = (user, permission) => {
  if (!user || !user.role) return false;
  // Super admin has unrestricted platform privileges
  if (user.role === ROLES.SUPER_ADMIN) return true;

  const userPermissions = ROLE_PERMISSIONS[user.role] || [];
  return userPermissions.includes(permission);
};

/**
 * Verifies tenant access:
 * Super Admins can view any hospital or platform wide.
 * Hospital staff/admins can ONLY access resources with matching tenantId.
 */
export const canAccessTenantData = (user, targetTenantId) => {
  if (!user) return false;
  if (user.role === ROLES.SUPER_ADMIN) return true;
  return user.tenantId === targetTenantId;
};

