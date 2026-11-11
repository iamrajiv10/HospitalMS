import { ROLES } from '../config/roles';

export const MOCK_HOSPITALS = [
  {
    id: 'hosp-apollo',
    name: 'Apollo Multispeciality Hospital',
    code: 'APOLLO-01',
    domain: 'apollo.curacloud.health',
    address: 'Greams Road, Chennai, India',
    tier: 'Enterprise',
    status: 'ACTIVE',
    activeBeds: 450,
    activeStaff: 280
  },
  {
    id: 'hosp-fortis',
    name: 'Fortis Memorial Hospital',
    code: 'FORTIS-02',
    domain: 'fortis.curacloud.health',
    address: 'Sector 44, Gurugram, India',
    tier: 'Pro',
    status: 'ACTIVE',
    activeBeds: 320,
    activeStaff: 195
  },
  {
    id: 'hosp-max',
    name: 'Max Healthcare Centre',
    code: 'MAX-03',
    domain: 'max.curacloud.health',
    address: 'Saket, New Delhi, India',
    tier: 'Standard',
    status: 'ACTIVE',
    activeBeds: 200,
    activeStaff: 110
  }
];

export const MOCK_USERS = [
  {
    id: 'usr-superadmin',
    name: 'Alexander Pierce (Platform Admin)',
    email: 'superadmin@curacloud.health',
    role: ROLES.SUPER_ADMIN,
    tenantId: null, // Super Admin is not tied to any single hospital tenant
    tenantName: 'Platform Global Scope',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  },
  {
    id: 'usr-hospadmin-apollo',
    name: 'Dr. Ramesh Sharma (Admin)',
    email: 'admin@apollo.curacloud.health',
    role: ROLES.HOSPITAL_ADMIN,
    tenantId: 'hosp-apollo',
    tenantName: 'Apollo Multispeciality Hospital',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
  },
  {
    id: 'usr-hospadmin-fortis',
    name: 'Dr. Sunita Rao (Fortis Admin)',
    email: 'admin@fortis.curacloud.health',
    role: ROLES.HOSPITAL_ADMIN,
    tenantId: 'hosp-fortis',
    tenantName: 'Fortis Memorial Hospital',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
  },
  {
    id: 'usr-receptionist',
    name: 'Priya Verma',
    email: 'priya.reception@apollo.curacloud.health',
    role: ROLES.RECEPTIONIST,
    tenantId: 'hosp-apollo',
    tenantName: 'Apollo Multispeciality Hospital',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150'
  },
  {
    id: 'usr-doctor',
    name: 'Dr. Arvind Kejriwal, MD (Cardiology)',
    email: 'dr.arvind@apollo.curacloud.health',
    role: ROLES.DOCTOR,
    tenantId: 'hosp-apollo',
    tenantName: 'Apollo Multispeciality Hospital',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=150'
  },
  {
    id: 'usr-inventory',
    name: 'Vikram Joshi (Pharmacy Lead)',
    email: 'vikram.pharmacy@apollo.curacloud.health',
    role: ROLES.INVENTORY_MANAGER,
    tenantId: 'hosp-apollo',
    tenantName: 'Apollo Multispeciality Hospital',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150'
  },
  {
    id: 'usr-ward',
    name: 'Sister Mary Joseph',
    email: 'mary.ward@apollo.curacloud.health',
    role: ROLES.WARD_MANAGER,
    tenantId: 'hosp-apollo',
    tenantName: 'Apollo Multispeciality Hospital',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150'
  }
];

