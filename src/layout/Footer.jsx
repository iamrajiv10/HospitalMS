import React from 'react';
import { Box, Typography, Stack } from '@mui/material';
import { useAuth } from '../context/AuthContext';

export const Footer = () => {
  const { authData } = useAuth();

  return (
    <Box
      component="footer"
      sx={{
        height: 50,
        bgcolor: '#ffffff',
        borderTop: '1px solid #e2e8f0',
        px: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexShrink: 0
      }}
    >
      <Typography variant="caption" color="text.secondary">
        © {new Date().getFullYear()} <b>{authData?.hospital_name || 'CuraCloud'}</b>. All Rights Reserved.
      </Typography>

      <Stack direction="row" spacing={2}>
        <Typography variant="caption" color="text.secondary">
          Tenant Token: <code>{authData?.hospital_id || 'Isolated'}</code>
        </Typography>
        <Typography variant="caption" color="text.disabled">
          SaaS v1.0.0
        </Typography>
      </Stack>
    </Box>
  );
};

export default Footer;

