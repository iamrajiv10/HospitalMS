import DashboardIcon from '@mui/icons-material/Dashboard';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import EventNoteIcon from '@mui/icons-material/EventNote';
import ReceiptIcon from '@mui/icons-material/Receipt';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import MedicationIcon from '@mui/icons-material/Medication';
import AssessmentIcon from '@mui/icons-material/Assessment';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HotelIcon from '@mui/icons-material/Hotel';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';

import { ROLES } from '../config/roles';

/**
 * Navigation menus configured per role.
 * Adding a new page to any role takes just 1 entry here!
 */
export const ROLE_NAVIGATION = {
  [ROLES.SUPER_ADMIN]: [
    { label: 'Global Overview', path: '/super-admin/dashboard', icon: DashboardIcon },
    { label: 'Hospitals Directory', path: '/super-admin/hospitals', icon: LocalHospitalIcon },
    { label: 'SaaS Subscriptions', path: '/super-admin/subscriptions', icon: SubscriptionsIcon },
    { label: 'Platform Settings', path: '/super-admin/settings', icon: SettingsIcon }
  ],
  [ROLES.HOSPITAL_ADMIN]: [
    { label: 'Hospital Overview', path: '/hospital-admin/dashboard', icon: DashboardIcon },
    { label: 'Staff Management', path: '/hospital-admin/staff', icon: PeopleAltIcon },
    { label: 'Roles & Permissions', path: '/hospital-admin/roles', icon: AdminPanelSettingsIcon },
    { label: 'Hospital Settings', path: '/hospital-admin/settings', icon: SettingsIcon }
  ],
  [ROLES.RECEPTIONIST]: [
    { label: 'Front Desk Overview', path: '/receptionist/dashboard', icon: DashboardIcon },
    { label: 'Patient Registration', path: '/receptionist/patients', icon: HowToRegIcon },
    { label: 'Appointments', path: '/receptionist/appointments', icon: EventNoteIcon },
    { label: 'Billing & Invoices', path: '/receptionist/billing', icon: ReceiptIcon }
  ],
  [ROLES.DOCTOR]: [
    { label: 'Doctor Hub', path: '/doctor/dashboard', icon: DashboardIcon },
    { label: 'Patient Clinical Records', path: '/doctor/patients', icon: MedicalInformationIcon },
    { label: 'Prescriptions & Rx', path: '/doctor/prescriptions', icon: MedicationIcon },
    { label: 'Consultations Schedule', path: '/doctor/consultations', icon: AssessmentIcon }
  ],
  [ROLES.INVENTORY_MANAGER]: [
    { label: 'Inventory Hub', path: '/inventory/dashboard', icon: DashboardIcon },
    { label: 'Medicines & Stock', path: '/inventory/medicines', icon: Inventory2Icon },
    { label: 'Suppliers & Vendors', path: '/inventory/suppliers', icon: LocalShippingIcon }
  ],
  [ROLES.WARD_MANAGER]: [
    { label: 'Ward Management Hub', path: '/wards/dashboard', icon: DashboardIcon },
    { label: 'Bed Allocation', path: '/wards/beds', icon: HotelIcon },
    { label: 'Admissions & Discharges', path: '/wards/admissions', icon: TransferWithinAStationIcon }
  ]
};

