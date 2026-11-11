import React from 'react';
import { Box, Typography, Chip, Tooltip } from '@mui/material';
import DomainIcon from '@mui/icons-material/Domain';
import SecurityIcon from '@mui/icons-material/Security';
import { useTenant } from '../../contexts/TenantContext';
import { useAuth } from '../../contexts/AuthContext';

export const TenantIndicator = () => {
  const { currentHospital } = useTenant();
  const { isSuperAdmin } = useAuth();

  if (!currentHospital) return null;

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1.5,
        px: 2,
        py: 0.75,
        borderRadius: 2,
        bgcolor: isSuperAdmin ? 'primary.50' : 'grey.100',
        border: '1px solid',
        borderColor: isSuperAdmin ? 'primary.200' : 'grey.300'
      }}
    >
      {isSuperAdmin ? (
        <SecurityIcon fontSize="small" color="primary" />
      ) : (
        <DomainIcon fontSize="small" color="secondary" />
      )}
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', lineHeight: 1 }}>
          {isSuperAdmin ? 'Global Platform Scope' : 'Active Hospital Tenant'}
        </Typography>
        <Typography variant="body2" sx={{ fontWeight: 600, color: 'text.primary', lineHeight: 1.3 }}>
          {currentHospital.name}
        </Typography>
      </Box>
      <Tooltip title="Data Isolation Guarantee: Tenant database scope enforced">
        <Chip
          label={currentHospital.tier || 'Tenant Isolated'}
          size="small"
          color={isSuperAdmin ? 'primary' : 'success'}
          sx={{ height: 20, fontSize: '0.65rem', fontWeight: 600 }}
        />
      </Tooltip>
    </Box>
  );
};

export default TenantIndicator;

