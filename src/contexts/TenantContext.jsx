import React, { createContext, useContext, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { MOCK_HOSPITALS } from '../services/mockData';
import { ROLES } from '../config/roles';

const TenantContext = createContext(null);

export const TenantProvider = ({ children }) => {
  const { currentUser } = useAuth();

  const currentHospital = useMemo(() => {
    if (!currentUser) return null;
    
    // Super Admins operate globally
    if (currentUser.role === ROLES.SUPER_ADMIN) {
      return {
        id: 'global-platform',
        name: 'Multi-Tenant Platform (Global Overview)',
        tier: 'Super Admin Access',
        status: 'GLOBAL'
      };
    }

    // Hospital Admin and staff are strictly bound to their tenantId
    const found = MOCK_HOSPITALS.find((h) => h.id === currentUser.tenantId);
    return found || {
      id: currentUser.tenantId,
      name: currentUser.tenantName || 'Unknown Hospital',
      tier: 'Standard',
      status: 'ACTIVE'
    };
  }, [currentUser]);

  // Security guard check
  const isCrossTenantAccess = (targetTenantId) => {
    if (!currentUser) return true;
    if (currentUser.role === ROLES.SUPER_ADMIN) return false; // Super admin can inspect
    return currentUser.tenantId !== targetTenantId;
  };

  const value = {
    currentHospital,
    tenantId: currentUser?.tenantId || null,
    isCrossTenantAccess,
    hospitalsList: currentUser?.role === ROLES.SUPER_ADMIN ? MOCK_HOSPITALS : []
  };

  return <TenantContext.Provider value={value}>{children}</TenantContext.Provider>;
};

export const useTenant = () => {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error('useTenant must be used within a TenantProvider');
  }
  return context;
};

