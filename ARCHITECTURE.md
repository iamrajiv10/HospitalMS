# CuraCloud - Hospital Management SaaS

## 🌟 Application Workflow & Architecture

### 1. Unified Authentication Workflow
- **Single Common Login Page (`Login.jsx`)**: All roles (Super Admin, Hospital Admin, Receptionist, Doctor, Inventory Manager, Ward Manager) authenticate via this unified entry point.
- **Login API Response Model**: Upon successful credentials verification, the backend returns:
  ```json
  {
    "token": "jwt-session-token",
    "hospital_id": "HOSP-APOLLO-01",
    "role": "HOSPITAL_ADMIN",
    "user_name": "Dr. Ramesh Sharma",
    "user_email": "admin@apollo.curacloud.health",
    "hospital_name": "Apollo Multispeciality Hospital",
    "hospital_logo": "https://images.unsplash.com/..."
  }
  ```
- **Persistent Storage & Network Security**:
  - The `hospital_id`, `role`, `user_name`, `hospital_name`, and `hospital_logo` are saved in persistent storage (`localStorage`) via [`AuthContext.jsx`](file:///c:/Users/Rajiv%20Kumar/Desktop/Fn-Mafia/New%20folder%20(2)/Hospital/src/context/AuthContext.jsx).
  - All subsequent network calls automatically pass `hospital_id` as the **Bearer token** (`Authorization: Bearer <hospital_id>`) via [`apiClient.js`](file:///c:/Users/Rajiv%20Kumar/Desktop/Fn-Mafia/New%20folder%20(2)/Hospital/src/services/apiClient.js).

---

### 2. Layout Structure & Proportions

The common application layout ([`Layout.jsx`](file:///c:/Users/Rajiv%20Kumar/Desktop/Fn-Mafia/New%20folder%20(2)/Hospital/src/layout/Layout.jsx)) coordinates four sub-components:

1. **Header (`Header.jsx`)**:
   - **Left Corner**: Hospital Logo (`hospital_logo`) + Hospital Legal Name (`hospital_name`) from login API response.
   - **Right Corner**: User Profile Name (`user_name`) + Current Role Badge (`role`) + Quick Role Demo Switcher + Logout.
2. **Sidebar / Sidepanel (`Sidebar.jsx`)**:
   - Occupies **10%** of the screen width on the left.
   - Displays a dynamic navigation dataset tailored to the user's role (6 distinct sets configured in `Layout.jsx`).
   - Defaults to the **1st section's page** upon logging in or switching roles.
3. **Main Section (`MainSection.jsx`)**:
   - Occupies the remaining **90%** of the screen width on the right.
   - Renders the active page selected from the sidebar.
4. **Footer (`Footer.jsx`)**:
   - Common bottom bar displaying copyright, tenant session identifier, and platform status.

---

### 3. Folder Structure

```
Hospital/
├── package.json                         # Dependencies & scripts
├── vite.config.js                       # Vite dev server configuration
├── ARCHITECTURE.md                      # Architecture & RBAC Guide
├── README.md                            # Quickstart instructions
└── src/
    ├── main.jsx                         # React 18 DOM mount point
    ├── App.jsx                          # Main App shell & theme provider
    ├── Login.jsx                        # 🌟 Common login page for all roles
    │
    ├── layout/                          # 🌟 Layout folder
    │   ├── Header.jsx                   # Hospital logo (left), User name & role (right)
    │   ├── Sidebar.jsx                  # 10% width left navigation sidepanel
    │   ├── MainSection.jsx              # 90% width main content area (opens 1st page by default)
    │   ├── Footer.jsx                   # Common bottom footer
    │   └── Layout.jsx                   # Connects all parts + defines SIDEBAR_MENU_DATA for 6 roles
    │
    ├── Components/                      # 🌟 Components folder partitioned by role
    │   ├── common/                      # Reusable UI widgets (PageHeader, StatCard)
    │   │   ├── PageHeader.jsx
    │   │   └── StatCard.jsx
    │   │
    │   ├── SuperAdmin/                  # Super Admin role pages
    │   │   ├── SuperAdminDashboard.jsx
    │   │   ├── HospitalDirectoryPage.jsx
    │   │   ├── SubscriptionPlansPage.jsx
    │   │   └── PlatformSettingsPage.jsx
    │   │
    │   ├── HospitalAdmin/               # Hospital Admin role pages (can add other staff roles)
    │   │   ├── HospitalAdminDashboard.jsx
    │   │   ├── StaffManagementPage.jsx  # Add Doctors, Receptionists, Inventory, Ward Managers
    │   │   ├── RolesPermissionsPage.jsx
    │   │   └── HospitalSettingsPage.jsx
    │   │
    │   ├── Receptionist/                # Receptionist role pages
    │   │   ├── ReceptionistDashboard.jsx
    │   │   ├── PatientRegistrationPage.jsx
    │   │   ├── AppointmentsPage.jsx
    │   │   └── BillingPage.jsx
    │   │
    │   ├── Doctor/                      # Doctor role pages
    │   │   ├── DoctorDashboard.jsx
    │   │   ├── PatientRecordsPage.jsx   # Clinical EMR
    │   │   ├── PrescriptionsPage.jsx    # Digital Rx
    │   │   └── ConsultationsPage.jsx
    │   │
    │   ├── InventoryManager/            # Inventory Manager role pages
    │   │   ├── InventoryDashboard.jsx
    │   │   ├── MedicinesStockPage.jsx
    │   │   └── SuppliersPage.jsx
    │   │
    │   └── WardManager/                 # Ward Manager role pages
    │       ├── WardDashboard.jsx
    │       ├── BedAllocationPage.jsx    # Real-time bed grid
    │       └── AdmissionsDischargesPage.jsx
    │
    ├── context/                         # State management
    │   └── AuthContext.jsx              # Stores login response data (hospital_id, role, name, logo)
    │
    ├── services/                        # Networking & mock data
    │   ├── apiClient.js                 # Automatically injects 'Bearer <hospital_id>' into all API calls
    │   └── mockData.js                  # Mock tenants & users
    │
    ├── config/                          # Role enums & app constants
    │   ├── roles.js                     # ROLES, ROLE_LABELS, ROLE_PERMISSIONS
    │   └── constants.js
    │
    └── theme/                           # Material UI design system
        └── index.js
```

---

### 4. How to Add a New Page or Section for Any Role

1. **Create the component** in `src/Components/<Role>/NewPage.jsx`.
2. **Register the section** in [`src/layout/Layout.jsx`](file:///c:/Users/Rajiv%20Kumar/Desktop/Fn-Mafia/New%20folder%20(2)/Hospital/src/layout/Layout.jsx) under `SIDEBAR_MENU_DATA[ROLES.<ROLE>]`:
   ```javascript
   { id: 'newpage', label: 'New Section', icon: YourIcon, component: NewPage }
   ```
3. *Done!* The new section immediately displays in that role's sidebar, and clicking it renders in the 90% main section.
