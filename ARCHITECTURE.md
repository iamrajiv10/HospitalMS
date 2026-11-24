# CuraCloud - Hospital Management SaaS

## 🌟 Application Workflow & Architecture

### 1. Unified Authentication Workflow
- **Main URL (`/`)**: Shows the unified Login page (`Login.jsx`). All roles authenticate through this common entry point.
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
- **Redirection**: On login, users are automatically directed to their role's respective default first page (e.g. `/hospital-admin/dashboard`, `/super-admin/dashboard`, etc.).
- **Persistent Storage & Network Security**:
  - The `hospital_id`, `role`, `user_name`, `hospital_name`, and `hospital_logo` are saved in persistent storage (`localStorage`) via [`AuthContext.jsx`](file:///c:/Users/Rajiv%20Kumar/Desktop/Fn-Mafia/New%20folder%20(2)/Hospital/src/context/AuthContext.jsx).
  - All subsequent network calls automatically pass `hospital_id` as the **Bearer token** (`Authorization: Bearer <hospital_id>`) via [`apiClient.js`](file:///c:/Users/Rajiv%20Kumar/Desktop/Fn-Mafia/New%20folder%20(2)/Hospital/src/services/apiClient.js).

---

### 2. Browser Router & Unique URLs per Page

Every page in the system has a distinct, bookmarkable URL managed via `react-router-dom`:

| Role | Section | URL Path |
| :--- | :--- | :--- |
| **All Roles** | Login Page | `/` |
| **Super Admin** | Platform Hub (Dashboard) | `/super-admin/dashboard` |
| **Super Admin** | Hospitals Directory | `/super-admin/hospitals` |
| **Super Admin** | SaaS Subscriptions | `/super-admin/subscriptions` |
| **Super Admin** | Platform Settings | `/super-admin/settings` |
| **Hospital Admin** | Hospital Hub (Dashboard) | `/hospital-admin/dashboard` |
| **Hospital Admin** | Staff Management | `/hospital-admin/staff` |
| **Hospital Admin** | RBAC Permissions | `/hospital-admin/roles` |
| **Hospital Admin** | Hospital Settings | `/hospital-admin/settings` |
| **Receptionist** | Front Desk Hub (Dashboard) | `/receptionist/dashboard` |
| **Receptionist** | Patient Registration | `/receptionist/patients` |
| **Receptionist** | Appointments | `/receptionist/appointments` |
| **Receptionist** | Billing & Invoices | `/receptionist/billing` |
| **Doctor** | Doctor Hub (Dashboard) | `/doctor/dashboard` |
| **Doctor** | Clinical Records (EMR) | `/doctor/patients` |
| **Doctor** | Prescriptions (Rx) | `/doctor/prescriptions` |
| **Doctor** | Consultations | `/doctor/consultations` |
| **Inventory Manager** | Inventory Hub (Dashboard) | `/inventory/dashboard` |
| **Inventory Manager** | Medicines & Stock | `/inventory/medicines` |
| **Inventory Manager** | Suppliers & Vendors | `/inventory/suppliers` |
| **Ward Manager** | Ward Hub (Dashboard) | `/ward/dashboard` |
| **Ward Manager** | Bed Allocation Matrix | `/ward/beds` |
| **Ward Manager** | Admissions & Discharges | `/ward/admissions` |

---

### 3. Layout Structure & Proportions

The common application layout ([`Layout.jsx`](file:///c:/Users/Rajiv%20Kumar/Desktop/Fn-Mafia/New%20folder%20(2)/Hospital/src/layout/Layout.jsx)) coordinates four sub-components:

1. **Header (`Header.jsx`)**:
   - **Left Corner**: Hospital Logo (`hospital_logo`) + Hospital Legal Name (`hospital_name`) from login API response.
   - **Right Corner**: User Profile Name (`user_name`) + Current Role Badge (`role`) + Quick Role Demo Switcher + Logout (which navigates back to `/`).
2. **Sidebar / Sidepanel (`Sidebar.jsx`)**:
   - Occupies **10%** of the screen width on the left.
   - Displays a dynamic navigation dataset tailored to the user's role (6 distinct sets configured in `Layout.jsx`).
   - Active section is matched against current `location.pathname` and clicking navigates to that page's URL.
3. **Main Section (`MainSection.jsx`)**:
   - Occupies the remaining **90%** of the screen width on the right.
   - Renders the active route's component via `<Outlet />`.
4. **Footer (`Footer.jsx`)**:
   - Common bottom bar displaying copyright, tenant session identifier, and platform status.

---

### 4. Folder Structure

```
Hospital/
├── package.json                         # Dependencies & scripts
├── vite.config.js                       # Vite dev server configuration
├── ARCHITECTURE.md                      # Architecture & Router documentation
├── README.md                            # Quickstart instructions
└── src/
    ├── main.jsx                         # React 18 DOM mount point
    ├── App.jsx                          # BrowserRouter & Route tree
    ├── Login.jsx                        # 🌟 Common login page at route "/"
    │
    ├── layout/                          # 🌟 Layout folder
    │   ├── Header.jsx                   # Hospital logo (left), User name & role (right)
    │   ├── Sidebar.jsx                  # 10% width left navigation sidepanel with router links
    │   ├── MainSection.jsx              # 90% width main content area with <Outlet />
    │   ├── Footer.jsx                   # Common bottom footer
    │   └── Layout.jsx                   # Connects all parts + defines SIDEBAR_MENU_DATA for 6 roles
    │
    ├── Components/                      # 🌟 Components folder partitioned by role
    │   ├── common/                      # Reusable UI widgets (PageHeader, StatCard)
    │   ├── SuperAdmin/                  # Super Admin role pages
    │   ├── HospitalAdmin/               # Hospital Admin role pages
    │   ├── Receptionist/                # Receptionist role pages
    │   ├── Doctor/                      # Doctor role pages
    │   ├── InventoryManager/            # Inventory Manager role pages
    │   └── WardManager/                 # Ward Manager role pages
    │
    ├── context/                         # State management
    │   └── AuthContext.jsx              # Stores login response data (hospital_id, role, name, logo)
    │
    ├── services/                        # Networking & mock data
    │   ├── apiClient.js                 # Injects 'Bearer <hospital_id>' into all API calls
    │   └── mockData.js                  # Mock tenants & users
    │
    ├── config/                          # Role enums & app constants
    │   ├── roles.js                     # ROLES, ROLE_LABELS, ROLE_HOME_ROUTES
    │   └── constants.js
    │
    └── theme/                           # Material UI design system
        └── index.js
```
