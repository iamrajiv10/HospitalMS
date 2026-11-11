import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ROLE_HOME_ROUTES } from '../../config/roles';

export const UnauthorizedView = ({ message }) => {
  const navigate = useNavigate();
  const { currentUser, role } = useAuth();

  const handleGoHome = () => {
    if (role && ROLE_HOME_ROUTES[role]) {
      navigate(ROLE_HOME_ROUTES[role]);
    } else {
      navigate('/login');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '70vh',
        p: 3
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 5,
          maxWidth: 500,
          textAlign: 'center',
          borderRadius: 3,
          border: '1px solid #fee2e2',
          bgcolor: '#fffaf0'
        }}
      >
        <Box
          sx={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            bgcolor: '#fee2e2',
            color: '#dc2626',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto'
          }}
        >
          <LockOutlinedIcon sx={{ fontSize: 32 }} />
        </Box>
        <Typography variant="h5" fontWeight={700} gutterBottom color="text.primary">
          Access Denied
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {message ||
            'You do not have the required permissions or tenant clearance to view this module.'}
        </Typography>
        <Typography variant="caption" color="text.disabled" sx={{ display: 'block', mb: 3 }}>
          Current Role: <b>{currentUser?.role || 'Guest'}</b> | Tenant:{' '}
          <b>{currentUser?.tenantName || 'Global'}</b>
        </Typography>
        <Button variant="contained" color="primary" onClick={handleGoHome}>
          Return to My Workspace
        </Button>
      </Paper>
    </Box>
  );
};

export default UnauthorizedView;

