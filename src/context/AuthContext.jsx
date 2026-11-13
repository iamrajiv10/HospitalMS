import React, { createContext, useContext, useState, useEffect } from 'react';
import { ROLES } from '../config/roles';
import { MOCK_USERS, MOCK_HOSPITALS } from '../services/mockData';

const AuthContext = createContext(null);

const STORAGE_KEY = 'hospital_saas_auth_data';

// Preset credentials for mock API login
export const PRESET_USERS = [
  {
    email: 'superadmin@curacloud.health',
    role: ROLES.SUPER_ADMIN,
    user_name: 'Alexander Pierce (Platform Head)',
    hospital_name: 'CuraCloud Global Network',
    hospital_id: 'GLOBAL-PLATFORM',
    hospital_logo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=100'
  },
  {
    email: 'admin@apollo.curacloud.health',
    role: ROLES.HOSPITAL_ADMIN,
    user_name: 'Dr. Ramesh Sharma',
    hospital_name: 'Apollo Multispeciality Hospital',
    hospital_id: 'HOSP-APOLLO-01',
    hospital_logo: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=100'
  },
  {
    email: 'admin@fortis.curacloud.health',
    role: ROLES.HOSPITAL_ADMIN,
    user_name: 'Dr. Sunita Rao (Fortis)',
    hospital_name: 'Fortis Memorial Hospital',
    hospital_id: 'HOSP-FORTIS-02',
    hospital_logo: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=100'
  },
  {
    email: 'reception@apollo.curacloud.health',
    role: ROLES.RECEPTIONIST,
    user_name: 'Priya Verma',
    hospital_name: 'Apollo Multispeciality Hospital',
    hospital_id: 'HOSP-APOLLO-01',
    hospital_logo: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=100'
  },
  {
    email: 'doctor@apollo.curacloud.health',
    role: ROLES.DOCTOR,
    user_name: 'Dr. Arvind Kejriwal, MD',
    hospital_name: 'Apollo Multispeciality Hospital',
    hospital_id: 'HOSP-APOLLO-01',
    hospital_logo: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=100'
  },
  {
    email: 'inventory@apollo.curacloud.health',
    role: ROLES.INVENTORY_MANAGER,
    user_name: 'Vikram Joshi (Pharmacy Lead)',
    hospital_name: 'Apollo Multispeciality Hospital',
    hospital_id: 'HOSP-APOLLO-01',
    hospital_logo: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=100'
  },
  {
    email: 'ward@apollo.curacloud.health',
    role: ROLES.WARD_MANAGER,
    user_name: 'Sister Mary Joseph',
    hospital_name: 'Apollo Multispeciality Hospital',
    hospital_id: 'HOSP-APOLLO-01',
    hospital_logo: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=100'
  }
];

export const AuthProvider = ({ children }) => {
  // Load saved session or default to Hospital Admin (Apollo)
  const [authData, setAuthData] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (err) {
        console.error('Failed to parse saved auth data', err);
      }
    }
    // Default initial mock login so the user can immediately experience the application
    return {
      token: 'jwt-auth-session-token-98124',
      hospital_id: 'HOSP-APOLLO-01',
      role: ROLES.HOSPITAL_ADMIN,
      user_name: 'Dr. Ramesh Sharma',
      user_email: 'admin@apollo.curacloud.health',
      hospital_name: 'Apollo Multispeciality Hospital',
      hospital_logo: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=100'
    };
  });

  useEffect(() => {
    if (authData) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authData));
      // Store hospital_id explicitly as required
      localStorage.setItem('hospital_id', authData.hospital_id || '');
    } else {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('hospital_id');
    }
  }, [authData]);

  // Common Login API simulation: returns role, user_name, hospital_name, hospital_id, hospital_logo
  const login = async (email, password) => {
    const matched = PRESET_USERS.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    
    // Simulate API response
    if (matched) {
      const responseData = {
        token: `jwt-${Date.now()}-${matched.role.toLowerCase()}`,
        hospital_id: matched.hospital_id,
        role: matched.role,
        user_name: matched.user_name,
        user_email: matched.email,
        hospital_name: matched.hospital_name,
        hospital_logo: matched.hospital_logo
      };
      setAuthData(responseData);
      return { success: true, data: responseData };
    }

    // Generic fallback for any email: Assigns Hospital Admin
    const genericResponse = {
      token: `jwt-${Date.now()}-user`,
      hospital_id: 'HOSP-APOLLO-01',
      role: ROLES.HOSPITAL_ADMIN,
      user_name: email.split('@')[0],
      user_email: email,
      hospital_name: 'Apollo Multispeciality Hospital',
      hospital_logo: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=100'
    };
    setAuthData(genericResponse);
    return { success: true, data: genericResponse };
  };

  const logout = () => {
    setAuthData(null);
  };

  // Helper for 1-click preview
  const switchRole = (targetRole, targetHospitalId = null) => {
    const matched = PRESET_USERS.find(
      (u) => u.role === targetRole && (targetHospitalId ? u.hospital_id === targetHospitalId : true)
    ) || PRESET_USERS.find((u) => u.role === targetRole);

    if (matched) {
      const responseData = {
        token: `jwt-${Date.now()}-${matched.role.toLowerCase()}`,
        hospital_id: matched.hospital_id,
        role: matched.role,
        user_name: matched.user_name,
        user_email: matched.email,
        hospital_name: matched.hospital_name,
        hospital_logo: matched.hospital_logo
      };
      setAuthData(responseData);
      return responseData;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        authData,
        role: authData?.role || null,
        isAuthenticated: !!authData,
        login,
        logout,
        switchRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

