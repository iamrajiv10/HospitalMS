# CuraCloud - Hospital Management SaaS

Built with **React.js + Vite** and **Material UI (MUI)**.

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

## 📐 Application Architecture & Workflow

1. **Common Login Page (`src/Login.jsx`)**:
   - All roles log in through this single common page.
   - The login API returns `hospital_id`, `role`, `user_name`, `hospital_name`, `hospital_logo`, and `token`.
   - All data is saved in local storage & context.
   - `hospital_id` is passed as the **Bearer token** in all subsequent API requests.
2. **Common Layout (`src/layout/`)**:
   - **Header (`Header.jsx`)**: Shows hospital logo & name on the left; user name & role on the right.
   - **Sidebar (`Sidebar.jsx`)**: 10% width on the left; dynamically displays that role's navigation menu.
   - **Main Section (`MainSection.jsx`)**: Remaining 90% width; opens the 1st section's page by default.
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
