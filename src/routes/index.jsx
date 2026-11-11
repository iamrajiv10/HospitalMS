import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import DashboardLayout from '../layouts/DashboardLayout';
import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from './ProtectedRoute';
import { ROLES, ROLE_HOME_ROUTES } from '../config/roles';
import { useAuth } from '../contexts/AuthContext';

// Auth Pages
import LoginPage from '../features/auth/pages/LoginPage';
import HospitalOnboardingPage from '../features/auth/pages/HospitalOnboardingPage';

// Super Admin Pages
import SuperAdminDashboard from '../features/superAdmin/pages/SuperAdminDashboard';
import HospitalDirectoryPage from '../features/superAdmin/pages/HospitalDirectoryPage';
import SubscriptionPlansPage from '../features/superAdmin/pages/SubscriptionPlansPage';
import PlatformSettingsPage from '../features/superAdmin/pages/PlatformSettingsPage';

// Hospital Admin Pages
import HospitalAdminDashboard from '../features/hospitalAdmin/pages/HospitalAdminDashboard';
import StaffManagementPage from '../features/hospitalAdmin/pages/StaffManagementPage';
import RolesPermissionsPage from '../features/hospitalAdmin/pages/RolesPermissionsPage';
import HospitalSettingsPage from '../features/hospitalAdmin/pages/HospitalSettingsPage';

// Receptionist Pages
import ReceptionistDashboard from '../features/receptionist/pages/ReceptionistDashboard';
import PatientRegistrationPage from '../features/receptionist/pages/PatientRegistrationPage';
import AppointmentsPage from '../features/receptionist/pages/AppointmentsPage';
import BillingPage from '../features/receptionist/pages/BillingPage';

// Doctor Pages
import DoctorDashboard from '../features/doctor/pages/DoctorDashboard';
import PatientRecordsPage from '../features/doctor/pages/PatientRecordsPage';
import PrescriptionsPage from '../features/doctor/pages/PrescriptionsPage';
import ConsultationsPage from '../features/doctor/pages/ConsultationsPage';

// Inventory Manager Pages
import InventoryDashboard from '../features/inventoryManager/pages/InventoryDashboard';
import MedicinesStockPage from '../features/inventoryManager/pages/MedicinesStockPage';
import SuppliersPage from '../features/inventoryManager/pages/SuppliersPage';

// Ward Manager Pages
import WardDashboard from '../features/wardManager/pages/WardDashboard';
import BedAllocationPage from '../features/wardManager/pages/BedAllocationPage';
import AdmissionsDischargesPage from '../features/wardManager/pages/AdmissionsDischargesPage';

/**
 * Root dynamic landing redirect based on active session
 */
const RootRedirect = () => {
  const { isAuthenticated, role } = useAuth();
  if (!isAuthenticated || !role) {
    return <Navigate to="/login" replace />;
  }
  return <Navigate to={ROLE_HOME_ROUTES[role] || '/login'} replace />;
};

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public / Auth Layout Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Authenticated Application Shell */}
      <Route
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        {/* Dynamic Root landing */}
        <Route path="/" element={<RootRedirect />} />

        {/* 1. SUPER ADMIN ROUTES (Strictly restricted to Platform Owner) */}
        <Route
          path="/super-admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
              <SuperAdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/hospitals"
          element={
            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
              <HospitalDirectoryPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/hospitals/new"
          element={
            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
              <HospitalOnboardingPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/subscriptions"
          element={
            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
              <SubscriptionPlansPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/super-admin/settings"
          element={
            <ProtectedRoute allowedRoles={[ROLES.SUPER_ADMIN]}>
              <PlatformSettingsPage />
            </ProtectedRoute>
          }
        />

        {/* 2. HOSPITAL ADMIN ROUTES (Tenant-isolated: cannot see other hospitals) */}
        <Route
          path="/hospital-admin/dashboard"
          element={
            <ProtectedRoute allowedRoles={[ROLES.HOSPITAL_ADMIN]} requireTenant>
              <HospitalAdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital-admin/staff"
          element={
            <ProtectedRoute allowedRoles={[ROLES.HOSPITAL_ADMIN]} requireTenant>
              <StaffManagementPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital-admin/roles"
          element={
            <ProtectedRoute allowedRoles={[ROLES.HOSPITAL_ADMIN]} requireTenant>
              <RolesPermissionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital-admin/settings"
          element={
            <ProtectedRoute allowedRoles={[ROLES.HOSPITAL_ADMIN]} requireTenant>
              <HospitalSettingsPage />
            </ProtectedRoute>
          }
        />

        {/* 3. RECEPTIONIST ROUTES */}
        <Route
          path="/receptionist/dashboard"
          element={
            <ProtectedRoute allowedRoles={[ROLES.RECEPTIONIST]} requireTenant>
              <ReceptionistDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receptionist/patients"
          element={
            <ProtectedRoute allowedRoles={[ROLES.RECEPTIONIST]} requireTenant>
              <PatientRegistrationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receptionist/appointments"
          element={
            <ProtectedRoute allowedRoles={[ROLES.RECEPTIONIST]} requireTenant>
              <AppointmentsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/receptionist/billing"
          element={
            <ProtectedRoute allowedRoles={[ROLES.RECEPTIONIST]} requireTenant>
              <BillingPage />
            </ProtectedRoute>
          }
        />

        {/* 4. DOCTOR ROUTES */}
        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute allowedRoles={[ROLES.DOCTOR]} requireTenant>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/patients"
          element={
            <ProtectedRoute allowedRoles={[ROLES.DOCTOR]} requireTenant>
              <PatientRecordsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/prescriptions"
          element={
            <ProtectedRoute allowedRoles={[ROLES.DOCTOR]} requireTenant>
              <PrescriptionsPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/consultations"
          element={
            <ProtectedRoute allowedRoles={[ROLES.DOCTOR]} requireTenant>
              <ConsultationsPage />
            </ProtectedRoute>
          }
        />

        {/* 5. INVENTORY MANAGER ROUTES */}
        <Route
          path="/inventory/dashboard"
          element={
            <ProtectedRoute allowedRoles={[ROLES.INVENTORY_MANAGER]} requireTenant>
              <InventoryDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory/medicines"
          element={
            <ProtectedRoute allowedRoles={[ROLES.INVENTORY_MANAGER]} requireTenant>
              <MedicinesStockPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/inventory/suppliers"
          element={
            <ProtectedRoute allowedRoles={[ROLES.INVENTORY_MANAGER]} requireTenant>
              <SuppliersPage />
            </ProtectedRoute>
          }
        />

        {/* 6. WARD MANAGER ROUTES */}
        <Route
          path="/wards/dashboard"
          element={
            <ProtectedRoute allowedRoles={[ROLES.WARD_MANAGER]} requireTenant>
              <WardDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wards/beds"
          element={
            <ProtectedRoute allowedRoles={[ROLES.WARD_MANAGER]} requireTenant>
              <BedAllocationPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wards/admissions"
          element={
            <ProtectedRoute allowedRoles={[ROLES.WARD_MANAGER]} requireTenant>
              <AdmissionsDischargesPage />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<RootRedirect />} />
    </Routes>
  );
};

export default AppRoutes;

