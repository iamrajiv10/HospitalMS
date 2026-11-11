# CuraCloud - Multi-Tenant Hospital Management System (SaaS)

> **Architectural Specification & Role-Based Access Control (RBAC) Guide**  
> Built with **React.js + Vite + Material UI (MUI)**

---

## 1. Executive Overview

**CuraCloud** is a scalable, cloud-native Multi-Tenant Software-as-a-Service (SaaS) platform for hospital operations. Multiple independent hospitals can onboard onto the same platform instance while maintaining **strict data isolation** and **role-based security**.

### Fundamental Multi-Tenant Principle:
- **Super Admin (Platform Owner)**: Operates at the global infrastructure layer. Can onboard new hospital tenants, manage subscription billing, view platform metrics, and configure global policies. Does not belong to any single hospital tenant.
- **Hospital Admin (Tenant Owner)**: Operates strictly within their own hospital tenant (`tenantId`). Can manage departments, invite and assign staff members (Receptionist, Doctor, Inventory Manager, Ward Manager), and manage hospital configurations.
- **Cross-Tenant Isolation Guarantee**: A Hospital Admin or staff member from *Hospital A* can **never** access, view, or modify data from *Hospital B*. All API requests and routing logic are bounded by tenant context.

---

## 2. Roles & Responsibilities Matrix

| Role | Scope | Primary Responsibilities | Default Home Route |
| :--- | :--- | :--- | :--- |
| **Super Admin** | Platform Global | Onboard hospitals, manage subscriptions, platform settings, infrastructure health | `/super-admin/dashboard` |
| **Hospital Admin** | Single Hospital | Hospital profile, staff management, role assignments, department access | `/hospital-admin/dashboard` |
| **Receptionist** | Single Hospital | Patient registration, OPD appointment scheduling, billing & cashier receipts | `/receptionist/dashboard` |
| **Doctor** | Single Hospital | Electronic Medical Records (EMR), patient diagnoses, digital prescriptions (Rx) | `/doctor/dashboard` |
| **Inventory Manager** | Single Hospital | Pharmacy catalog, drug stock alerts, batch expiry tracking, pharma suppliers | `/inventory/dashboard` |
| **Ward Manager** | Single Hospital | Bed matrix, ICU & general ward occupancy, admission intake, discharge clearance | `/wards/dashboard` |

---

## 3. Directory & Folder Structure

The project follows a **Feature-Slices by Domain & Role** architecture. Every role has its own dedicated directory containing its pages, components, and services, making maintenance and scalability effortless.

```
Hospital/
├── index.html                           # Single page entry HTML
├── package.json                         # Project dependencies and build scripts
├── vite.config.js                       # Vite build configuration (Port 3000)
├── README.md                            # Quickstart instructions
├── ARCHITECTURE.md                      # Complete SaaS Architecture Guide (This file)
├── public/
│   └── vite.svg                         # Application favicon
└── src/
    ├── main.jsx                         # React 18 DOM mount point
    ├── App.jsx                          # Theme, Context Providers, Router wrapper
    │
    ├── config/                          # Central constants and role definitions
    │   ├── constants.js                 # App configuration & LocalStorage keys
    │   └── roles.js                     # ROLES enum, ROLE_LABELS, ROLE_PERMISSIONS, ROLE_HOME_ROUTES
    │
    ├── theme/                           # Material UI Design System
    │   └── index.js                     # Custom palette, typography, borderRadius, component overrides
    │
    ├── contexts/                        # React Context State Management
    │   ├── AuthContext.jsx              # Current user session, role, login/logout, demo role switcher
    │   ├── TenantContext.jsx            # Current hospital tenant, cross-tenant isolation enforcement
    │   └── NotificationContext.jsx      # Global MUI snackbar alerts and feedback toasts
    │
    ├── services/                        # API & Networking
    │   ├── apiClient.js                 # HTTP client with automatic 'X-Tenant-ID' and Bearer headers
    │   └── mockData.js                  # Preloaded tenants (Apollo, Fortis, Max) and test users for all 6 roles
    │
    ├── utils/                           # Helper utilities
    │   └── rbac.js                      # 'hasRole', 'hasPermission', 'canAccessTenantData'
    │
    ├── components/                      # Shared, generic UI components
    │   ├── common/
    │   │   ├── PageHeader.jsx           # Standard header with title, subtitle, role badge & action buttons
    │   │   ├── StatCard.jsx             # Key Performance Indicator (KPI) metric widget
    │   │   └── LoadingSpinner.jsx       # Standard progress indicator
    │   └── feedback/
    │       └── UnauthorizedView.jsx     # Friendly "Access Denied" screen for unauthorized attempts
    │
    ├── layouts/                         # Page shells and chrome
    │   ├── AuthLayout.jsx               # Centered card layout for Login & Public screens
    │   ├── DashboardLayout.jsx          # App shell: Topbar + Responsive Sidebar + Dynamic Container
    │   └── components/
    │       ├── Topbar.jsx               # Header with Tenant indicator, Role switcher menu, Profile
    │       ├── Sidebar.jsx              # Role-filtered drawer navigation
    │       └── TenantIndicator.jsx      # Badge displaying active hospital name & isolation guarantee
    │
    ├── routes/                          # Routing logic & Access control
    │   ├── index.jsx                    # Central React Router route tree
    │   ├── ProtectedRoute.jsx           # Guard: verifies authentication, role clearance, and tenant ID
    │   └── navigationConfig.js          # Sidebar links mapped to each role
    │
    └── features/                        # Feature modules partitioned by domain and role
        ├── auth/                        # Authentication & Onboarding
        │   └── pages/
        │       ├── LoginPage.jsx
        │       └── HospitalOnboardingPage.jsx
        │
        ├── superAdmin/                  # 1. Super Admin Features
        │   └── pages/
        │       ├── SuperAdminDashboard.jsx
        │       ├── HospitalDirectoryPage.jsx
        │       ├── SubscriptionPlansPage.jsx
        │       └── PlatformSettingsPage.jsx
        │
        ├── hospitalAdmin/               # 2. Hospital Admin Features
        │   └── pages/
        │       ├── HospitalAdminDashboard.jsx
        │       ├── StaffManagementPage.jsx       # Add Receptionists, Doctors, etc.
        │       ├── RolesPermissionsPage.jsx
        │       └── HospitalSettingsPage.jsx
        │
        ├── receptionist/                # 3. Receptionist Features
        │   └── pages/
        │       ├── ReceptionistDashboard.jsx
        │       ├── PatientRegistrationPage.jsx
        │       ├── AppointmentsPage.jsx
        │       └── BillingPage.jsx
        │
        ├── doctor/                      # 4. Doctor Features
        │   └── pages/
        │       ├── DoctorDashboard.jsx
        │       ├── PatientRecordsPage.jsx
        │       ├── PrescriptionsPage.jsx
        │       └── ConsultationsPage.jsx
        │
        ├── inventoryManager/            # 5. Inventory Manager Features
        │   └── pages/
        │       ├── InventoryDashboard.jsx
        │       ├── MedicinesStockPage.jsx
        │       └── SuppliersPage.jsx
        │
        └── wardManager/                 # 6. Ward Manager Features
            └── pages/
                ├── WardDashboard.jsx
                ├── BedAllocationPage.jsx
                └── AdmissionsDischargesPage.jsx
```

---

## 4. How to Add a New Page or Feature in 3 Steps

Adding a new module or page for **any role** is straightforward and takes less than 3 minutes:

### Step 1: Create your Page Component
Create your new page under the appropriate role directory in `src/features/<roleName>/pages/`:
```jsx
// src/features/doctor/pages/LabReportsPage.jsx
import React from 'react';
import PageHeader from '../../../components/common/PageHeader';

export const LabReportsPage = () => {
  return (
    <>
      <PageHeader
        title="Diagnostic & Pathology Lab Reports"
        subtitle="Review inbound laboratory test reports and culture results."
        roleBadge="Doctor"
      />
      {/* Your components here */}
    </>
  );
};

export default LabReportsPage;
```

### Step 2: Register the Route in `src/routes/index.jsx`
Add the route under the role's section and wrap it in `<ProtectedRoute allowedRoles={[ROLES.DOCTOR]} requireTenant>`:
```jsx
import LabReportsPage from '../features/doctor/pages/LabReportsPage';

// Inside AppRoutes:
<Route
  path="/doctor/lab-reports"
  element={
    <ProtectedRoute allowedRoles={[ROLES.DOCTOR]} requireTenant>
      <LabReportsPage />
    </ProtectedRoute>
  }
/>
```

### Step 3: Add to Sidebar Navigation in `src/routes/navigationConfig.js`
Add an entry to `ROLE_NAVIGATION[ROLES.DOCTOR]`:
```js
import ScienceIcon from '@mui/icons-material/Science';

// In ROLE_NAVIGATION[ROLES.DOCTOR]:
{ 
  label: 'Lab Reports', 
  path: '/doctor/lab-reports', 
  icon: ScienceIcon 
}
```
*Done! The link automatically displays in the sidebar only when a Doctor logs in, and the route is guarded.*

---

## 5. Security & Isolation Strategy

### A. HTTP Request Isolation (`apiClient.js`)
Every request sent to the API automatically attaches the client's tenant identifier:
```http
GET /api/v1/patients HTTP/1.1
Authorization: Bearer <jwt-token>
X-Tenant-ID: hosp-apollo
```
On the backend (PostgreSQL / MySQL / MongoDB):
- Data queries are filtered by `WHERE tenant_id = current_tenant_id` (Row-Level Security) OR routed to isolated tenant schemas.

### B. Client-side Route Guarding (`ProtectedRoute.jsx`)
1. **Unauthenticated Redirect**: Unauthenticated users are redirected to `/login`.
2. **Role Mismatch Shield**: If a Receptionist tries to access `/hospital-admin/staff`, the route intercepts and renders an `UnauthorizedView` stating the role requirement without leaking confidential pages.
3. **Tenant Absence Shield**: Staff cannot view tenant modules if no tenant context is established.

---

## 6. Testing All 6 Roles Out-of-the-Box (Demo Mode)

The application includes a built-in **Quick Role Switcher** in the Top Header:
1. Click **"Switch Role"** in the top navigation bar.
2. Select any role:
   - **Super Admin**: Explore platform-wide SaaS metrics and onboard new hospitals.
   - **Hospital Admin (Apollo)**: Manage Apollo Hospital staff, bed counts, and role permissions.
   - **Hospital Admin (Fortis)**: Demonstrates tenant isolation (different staff, different tenant context).
   - **Receptionist**: Register patients and manage appointment queues.
   - **Doctor**: Inspect clinical EMR and issue digital prescriptions.
   - **Inventory Manager**: Check drug inventory and low stock alerts.
   - **Ward Manager**: View real-time bed occupancy grid and admissions.

