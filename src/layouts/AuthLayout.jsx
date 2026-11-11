import React from 'react';
import { Box, Card, Container, Typography } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        bgcolor: '#f1f5f9',
        p: 2
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 4 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2.5,
            bgcolor: 'primary.main',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.35)'
          }}
        >
          <LocalHospitalIcon fontSize="medium" />
        </Box>
        <Box>
          <Typography variant="h5" fontWeight={800} color="text.primary">
            CuraCloud
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            Multi-Tenant Hospital Management SaaS
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="sm">
        <Card sx={{ p: { xs: 3, sm: 5 }, borderRadius: 3 }}>
          <Outlet />
        </Card>
      </Container>
    </Box>
  );
};

export default AuthLayout;

