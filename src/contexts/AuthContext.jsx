import React, { createContext, useContext, useState, useEffect } from 'react';
import { APP_CONFIG } from '../config/constants';
import { MOCK_USERS } from '../services/mockData';
import { ROLES, ROLE_HOME_ROUTES } from '../config/roles';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Default to Super Admin so user immediately sees a working dashboard, or load from storage
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.AUTH_USER);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse user from local storage', e);
      }
    }
    return MOCK_USERS[0]; // Default to Super Admin
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(APP_CONFIG.STORAGE_KEYS.AUTH_USER, JSON.stringify(currentUser));
      if (currentUser.tenantId) {
        localStorage.setItem(APP_CONFIG.STORAGE_KEYS.ACTIVE_TENANT, currentUser.tenantId);
      } else {
        localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.ACTIVE_TENANT);
      }
    } else {
      localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.AUTH_USER);
      localStorage.removeItem(APP_CONFIG.STORAGE_KEYS.ACTIVE_TENANT);
    }
  }, [currentUser]);

  const login = (email) => {
    setLoading(true);
    const user = MOCK_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      setLoading(false);
      return { success: true, user, redirectUrl: ROLE_HOME_ROUTES[user.role] };
    }
    setLoading(false);
    return { success: false, message: 'User not found in system' };
  };

  const logout = () => {
    setCurrentUser(null);
  };

  // Helper function to easily switch roles for testing
  const switchRole = (role, tenantId = null) => {
    const matched = MOCK_USERS.find(
      (u) => u.role === role && (tenantId ? u.tenantId === tenantId : true)
    ) || MOCK_USERS.find((u) => u.role === role);

    if (matched) {
      setCurrentUser(matched);
      return ROLE_HOME_ROUTES[matched.role];
    }
    return '/';
  };

  const value = {
    currentUser,
    role: currentUser?.role || null,
    isAuthenticated: !!currentUser,
    isSuperAdmin: currentUser?.role === ROLES.SUPER_ADMIN,
    isHospitalAdmin: currentUser?.role === ROLES.HOSPITAL_ADMIN,
    login,
    logout,
    switchRole,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

