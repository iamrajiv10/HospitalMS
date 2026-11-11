import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTenant } from '../contexts/TenantContext';
import UnauthorizedView from '../components/feedback/UnauthorizedView';
import LoadingSpinner from '../components/common/LoadingSpinner';

export const ProtectedRoute = ({ children, allowedRoles = [], requireTenant = false }) => {
  const { isAuthenticated, currentUser, role, loading } = useAuth();
  const { tenantId, isCrossTenantAccess } = useTenant();
  const location = useLocation();

  if (loading) {
    return <LoadingSpinner message="Validating credentials & tenant credentials..." />;
  }

  // 1. Authentication check
  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Role-Based Access Control check
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return (
      <UnauthorizedView
        message={`Access restricted: This section requires one of the following roles: [${allowedRoles.join(
          ', '
        )}]. Your current role is ${role}.`}
      />
    );
  }

  // 3. Multi-Tenant isolation check
  // Non-super-admin users must have an active tenantId
  if (requireTenant && !tenantId && role !== 'SUPER_ADMIN') {
    return (
      <UnauthorizedView
        message="Tenant error: You must belong to an active hospital tenant to view this module."
      />
    );
  }

  return children;
};

export default ProtectedRoute;

