/**
 * System Roles and Permissions Matrix
 * Multi-Tenant Hospital Management System (SaaS)
 */

export const ROLES = {
  SUPER_ADMIN: 'SUPER_ADMIN',
  HOSPITAL_ADMIN: 'HOSPITAL_ADMIN',
  RECEPTIONIST: 'RECEPTIONIST',
  DOCTOR: 'DOCTOR',
  INVENTORY_MANAGER: 'INVENTORY_MANAGER',
  WARD_MANAGER: 'WARD_MANAGER'
};

export const ROLE_LABELS = {
  [ROLES.SUPER_ADMIN]: 'Super Admin (Platform Owner)',
  [ROLES.HOSPITAL_ADMIN]: 'Hospital Admin',
  [ROLES.RECEPTIONIST]: 'Receptionist',
  [ROLES.DOCTOR]: 'Doctor',
  [ROLES.INVENTORY_MANAGER]: 'Inventory Manager',
  [ROLES.WARD_MANAGER]: 'Ward Manager'
};

export const ROLE_HOME_ROUTES = {
  [ROLES.SUPER_ADMIN]: '/super-admin/dashboard',
  [ROLES.HOSPITAL_ADMIN]: '/hospital-admin/dashboard',
  [ROLES.RECEPTIONIST]: '/receptionist/dashboard',
  [ROLES.DOCTOR]: '/doctor/dashboard',
  [ROLES.INVENTORY_MANAGER]: '/inventory/dashboard',
  [ROLES.WARD_MANAGER]: '/ward/dashboard'
};

// Capabilities per role
export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    'platform:manage_all',
    'hospitals:create',
    'hospitals:view_all',
    'hospitals:suspend',
    'subscriptions:manage',
    'audit_logs:view_global'
  ],
  [ROLES.HOSPITAL_ADMIN]: [
    'tenant:manage',
    'staff:create',
    'staff:read',
    'staff:update',
    'staff:delete',
    'roles:assign',
    'hospital:settings',
    'reports:view_hospital'
  ],
  [ROLES.RECEPTIONIST]: [
    'patients:register',
    'patients:read',
    'appointments:create',
    'appointments:reschedule',
    'billing:create_invoice',
    'billing:collect_payment'
  ],
  [ROLES.DOCTOR]: [
    'patients:clinical_read',
    'prescriptions:create',
    'prescriptions:update',
    'consultations:conduct',
    'diagnosis:record',
    'lab_tests:order'
  ],
  [ROLES.INVENTORY_MANAGER]: [
    'medicines:view',
    'medicines:stock_in',
    'medicines:stock_out',
    'medicines:alerts',
    'suppliers:manage',
    'purchase_orders:create'
  ],
  [ROLES.WARD_MANAGER]: [
    'wards:view',
    'beds:allocate',
    'beds:release',
    'admissions:create',
    'discharges:process'
  ]
};
