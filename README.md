# CuraCloud - Hospital Management SaaS

Built with **React.js + Vite**, **React Router v6**, and **Material UI (MUI)**.

---

## 🚀 Running the Project

```bash
# 1. Start development server
npm run dev

# 2. Production build test
npm run build
```

Open **`http://localhost:3000`** in your browser.

---

## 🧭 Browser Router & URLs

- **Main URL (`/`)**: Displays the common **Login Page**.
- **Every page has its own URL**:
  - Super Admin: `/super-admin/dashboard`, `/super-admin/hospitals`, `/super-admin/subscriptions`, `/super-admin/settings`
  - Hospital Admin: `/hospital-admin/dashboard`, `/hospital-admin/staff`, `/hospital-admin/roles`, `/hospital-admin/settings`
  - Receptionist: `/receptionist/dashboard`, `/receptionist/patients`, `/receptionist/appointments`, `/receptionist/billing`
  - Doctor: `/doctor/dashboard`, `/doctor/patients`, `/doctor/prescriptions`, `/doctor/consultations`
  - Inventory Manager: `/inventory/dashboard`, `/inventory/medicines`, `/inventory/suppliers`
  - Ward Manager: `/ward/dashboard`, `/ward/beds`, `/ward/admissions`

---

## 📐 Application Architecture & Workflow

1. **Common Login Page (`src/Login.jsx`) at `/`**:
   - All roles log in through this single common page.
   - The login API returns `hospital_id`, `role`, `user_name`, `hospital_name`, `hospital_logo`, and `token`.
   - `hospital_id` is passed as the **Bearer token** in all subsequent API requests.
   - On login, redirects to that role's first section URL.
2. **Common Layout (`src/layout/`)**:
   - **Header (`Header.jsx`)**: Shows hospital logo & name on the left; user name, role, switcher & logout on the right.
   - **Sidebar (`Sidebar.jsx`)**: 10% width on the left; navigates to page URLs.
   - **Main Section (`MainSection.jsx`)**: 90% width; renders the active route component via `<Outlet />`.
   - **Footer (`Footer.jsx`)**: Common bottom footer.
   - **Layout (`Layout.jsx`)**: Contains the 6 different sets of sidebar data for each role.
3. **Components Folder (`src/Components/`)**:
   - Organized into a folder for each role:
     - `SuperAdmin/`
     - `HospitalAdmin/`
     - `Receptionist/`
     - `Doctor/`
     - `InventoryManager/`
     - `WardManager/`
     - `common/`

For comprehensive documentation, see [ARCHITECTURE.md](file:///c:/Users/Rajiv%20Kumar/Desktop/Fn-Mafia/New%20folder%20(2)/Hospital/ARCHITECTURE.md).
