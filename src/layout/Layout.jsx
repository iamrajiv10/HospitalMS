import React from 'react';
import { Box } from '@mui/material';

// Icons for Sidebar menus
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

// Layout sub-components
import Header from './Header';
import Sidebar from './Sidebar';
import MainSection from './MainSection';
import Footer from './Footer';

// Context
import { useAuth } from '../context/AuthContext';
import { ROLES } from '../config/roles';

// Role-based Pages from Components/ folder
import SuperAdminDashboard from '../Components/SuperAdmin/SuperAdminDashboard';
import HospitalDirectoryPage from '../Components/SuperAdmin/HospitalDirectoryPage';
import SubscriptionPlansPage from '../Components/SuperAdmin/SubscriptionPlansPage';
import PlatformSettingsPage from '../Components/SuperAdmin/PlatformSettingsPage';

import HospitalAdminDashboard from '../Components/HospitalAdmin/HospitalAdminDashboard';
import StaffManagementPage from '../Components/HospitalAdmin/StaffManagementPage';
import RolesPermissionsPage from '../Components/HospitalAdmin/RolesPermissionsPage';
import HospitalSettingsPage from '../Components/HospitalAdmin/HospitalSettingsPage';

import ReceptionistDashboard from '../Components/Receptionist/ReceptionistDashboard';
import PatientRegistrationPage from '../Components/Receptionist/PatientRegistrationPage';
import AppointmentsPage from '../Components/Receptionist/AppointmentsPage';
import BillingPage from '../Components/Receptionist/BillingPage';

import DoctorDashboard from '../Components/Doctor/DoctorDashboard';
import PatientRecordsPage from '../Components/Doctor/PatientRecordsPage';
import PrescriptionsPage from '../Components/Doctor/PrescriptionsPage';
import ConsultationsPage from '../Components/Doctor/ConsultationsPage';

import InventoryDashboard from '../Components/InventoryManager/InventoryDashboard';
import MedicinesStockPage from '../Components/InventoryManager/MedicinesStockPage';
import SuppliersPage from '../Components/InventoryManager/SuppliersPage';

import WardDashboard from '../Components/WardManager/WardDashboard';
import BedAllocationPage from '../Components/WardManager/BedAllocationPage';
import AdmissionsDischargesPage from '../Components/WardManager/AdmissionsDischargesPage';

/**
 * 6 DIFFERENT SETS OF SIDEBAR/SIDEPANEL DATA FOR EACH ROLE
 * Each page has its own dedicated, unique URL path.
 */
export const SIDEBAR_MENU_DATA = {
  [ROLES.SUPER_ADMIN]: [
    { id: 'dashboard', label: 'Platform Hub', path: '/super-admin/dashboard', icon: DashboardIcon, component: SuperAdminDashboard },
    { id: 'hospitals', label: 'Hospitals Directory', path: '/super-admin/hospitals', icon: LocalHospitalIcon, component: HospitalDirectoryPage },
    { id: 'subscriptions', label: 'SaaS Subscriptions', path: '/super-admin/subscriptions', icon: SubscriptionsIcon, component: SubscriptionPlansPage },
    { id: 'settings', label: 'Platform Settings', path: '/super-admin/settings', icon: SettingsIcon, component: PlatformSettingsPage }
  ],
  [ROLES.HOSPITAL_ADMIN]: [
    { id: 'dashboard', label: 'Hospital Hub', path: '/hospital-admin/dashboard', icon: DashboardIcon, component: HospitalAdminDashboard },
    { id: 'staff', label: 'Staff & Roles', path: '/hospital-admin/staff', icon: PeopleAltIcon, component: StaffManagementPage },
    { id: 'roles', label: 'RBAC Permissions', path: '/hospital-admin/roles', icon: AdminPanelSettingsIcon, component: RolesPermissionsPage },
    { id: 'settings', label: 'Hospital Settings', path: '/hospital-admin/settings', icon: SettingsIcon, component: HospitalSettingsPage }
  ],
  [ROLES.RECEPTIONIST]: [
    { id: 'dashboard', label: 'Front Desk Hub', path: '/receptionist/dashboard', icon: DashboardIcon, component: ReceptionistDashboard },
    { id: 'patients', label: 'Patient Registration', path: '/receptionist/patients', icon: HowToRegIcon, component: PatientRegistrationPage },
    { id: 'appointments', label: 'Appointments', path: '/receptionist/appointments', icon: EventNoteIcon, component: AppointmentsPage },
    { id: 'billing', label: 'Billing & Cashier', path: '/receptionist/billing', icon: ReceiptIcon, component: BillingPage }
  ],
  [ROLES.DOCTOR]: [
    { id: 'dashboard', label: 'Doctor Hub', path: '/doctor/dashboard', icon: DashboardIcon, component: DoctorDashboard },
    { id: 'patients', label: 'Clinical Records (EMR)', path: '/doctor/patients', icon: MedicalInformationIcon, component: PatientRecordsPage },
    { id: 'prescriptions', label: 'Prescriptions (Rx)', path: '/doctor/prescriptions', icon: MedicationIcon, component: PrescriptionsPage },
    { id: 'consultations', label: 'Consultations', path: '/doctor/consultations', icon: AssessmentIcon, component: ConsultationsPage }
  ],
  [ROLES.INVENTORY_MANAGER]: [
    { id: 'dashboard', label: 'Inventory Hub', path: '/inventory/dashboard', icon: DashboardIcon, component: InventoryDashboard },
    { id: 'medicines', label: 'Medicines & Stock', path: '/inventory/medicines', icon: Inventory2Icon, component: MedicinesStockPage },
    { id: 'suppliers', label: 'Suppliers & Vendors', path: '/inventory/suppliers', icon: LocalShippingIcon, component: SuppliersPage }
  ],
  [ROLES.WARD_MANAGER]: [
    { id: 'dashboard', label: 'Ward Hub', path: '/ward/dashboard', icon: DashboardIcon, component: WardDashboard },
    { id: 'beds', label: 'Bed Matrix', path: '/ward/beds', icon: HotelIcon, component: BedAllocationPage },
    { id: 'admissions', label: 'Admissions / Discharge', path: '/ward/admissions', icon: TransferWithinAStationIcon, component: AdmissionsDischargesPage }
  ]
};

export const Layout = () => {
  const { role } = useAuth();

  // Get active menu list for current role (fallback to Hospital Admin)
  const menuItems = (role && SIDEBAR_MENU_DATA[role]) || SIDEBAR_MENU_DATA[ROLES.HOSPITAL_ADMIN];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* 1. Header (Hospital Logo in left, Logged-in User & Role in right) */}
      <Header />

      {/* 2. Body Area (10% Sidebar on Left, 90% MainSection on Right) */}
      <Box
        sx={{
          display: 'flex',
          flexGrow: 1,
          flexDirection: { xs: 'column', md: 'row' }
        }}
      >
        {/* Left Side: Sidebar taking 10% width */}
        <Sidebar menuItems={menuItems} />

        {/* Right Side: MainSection taking remaining 90% width (renders active router page via Outlet) */}
        <MainSection />
      </Box>

      {/* 3. Bottom Common Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;
