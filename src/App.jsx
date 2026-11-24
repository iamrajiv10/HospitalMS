import React, { useMemo } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createAppTheme } from './theme';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './layout/Layout';
import Login from './Login';

// Super Admin Pages
import SuperAdminDashboard from './Components/SuperAdmin/SuperAdminDashboard';
import HospitalDirectoryPage from './Components/SuperAdmin/HospitalDirectoryPage';
import SubscriptionPlansPage from './Components/SuperAdmin/SubscriptionPlansPage';
import PlatformSettingsPage from './Components/SuperAdmin/PlatformSettingsPage';

// Hospital Admin Pages
import HospitalAdminDashboard from './Components/HospitalAdmin/HospitalAdminDashboard';
import StaffManagementPage from './Components/HospitalAdmin/StaffManagementPage';
import RolesPermissionsPage from './Components/HospitalAdmin/RolesPermissionsPage';
import HospitalSettingsPage from './Components/HospitalAdmin/HospitalSettingsPage';

// Receptionist Pages
import ReceptionistDashboard from './Components/Receptionist/ReceptionistDashboard';
import PatientRegistrationPage from './Components/Receptionist/PatientRegistrationPage';
import AppointmentsPage from './Components/Receptionist/AppointmentsPage';
import BillingPage from './Components/Receptionist/BillingPage';

// Doctor Pages
import DoctorDashboard from './Components/Doctor/DoctorDashboard';
import PatientRecordsPage from './Components/Doctor/PatientRecordsPage';
import PrescriptionsPage from './Components/Doctor/PrescriptionsPage';
import ConsultationsPage from './Components/Doctor/ConsultationsPage';

// Inventory Manager Pages
import InventoryDashboard from './Components/InventoryManager/InventoryDashboard';
import MedicinesStockPage from './Components/InventoryManager/MedicinesStockPage';
import SuppliersPage from './Components/InventoryManager/SuppliersPage';

// Ward Manager Pages
import WardDashboard from './Components/WardManager/WardDashboard';
import BedAllocationPage from './Components/WardManager/BedAllocationPage';
import AdmissionsDischargesPage from './Components/WardManager/AdmissionsDischargesPage';

// Protected Route Guard
const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <Layout />;
};

function App() {
  const theme = useMemo(() => createAppTheme('light'), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Main URL "/" strictly shows the Login page as requested */}
            <Route path="/" element={<Login />} />

            {/* Application Layout for all role pages with individual URLs */}
            <Route element={<ProtectedLayout />}>
              {/* 1. Super Admin Pages */}
              <Route path="/super-admin/dashboard" element={<SuperAdminDashboard />} />
              <Route path="/super-admin/hospitals" element={<HospitalDirectoryPage />} />
              <Route path="/super-admin/subscriptions" element={<SubscriptionPlansPage />} />
              <Route path="/super-admin/settings" element={<PlatformSettingsPage />} />

              {/* 2. Hospital Admin Pages */}
              <Route path="/hospital-admin/dashboard" element={<HospitalAdminDashboard />} />
              <Route path="/hospital-admin/staff" element={<StaffManagementPage />} />
              <Route path="/hospital-admin/roles" element={<RolesPermissionsPage />} />
              <Route path="/hospital-admin/settings" element={<HospitalSettingsPage />} />

              {/* 3. Receptionist Pages */}
              <Route path="/receptionist/dashboard" element={<ReceptionistDashboard />} />
              <Route path="/receptionist/patients" element={<PatientRegistrationPage />} />
              <Route path="/receptionist/appointments" element={<AppointmentsPage />} />
              <Route path="/receptionist/billing" element={<BillingPage />} />

              {/* 4. Doctor Pages */}
              <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
              <Route path="/doctor/patients" element={<PatientRecordsPage />} />
              <Route path="/doctor/prescriptions" element={<PrescriptionsPage />} />
              <Route path="/doctor/consultations" element={<ConsultationsPage />} />

              {/* 5. Inventory Manager Pages */}
              <Route path="/inventory/dashboard" element={<InventoryDashboard />} />
              <Route path="/inventory/medicines" element={<MedicinesStockPage />} />
              <Route path="/inventory/suppliers" element={<SuppliersPage />} />

              {/* 6. Ward Manager Pages */}
              <Route path="/ward/dashboard" element={<WardDashboard />} />
              <Route path="/ward/beds" element={<BedAllocationPage />} />
              <Route path="/ward/admissions" element={<AdmissionsDischargesPage />} />
            </Route>

            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
