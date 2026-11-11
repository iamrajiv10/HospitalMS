import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  Stack,
  Alert,
  Chip
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { MOCK_USERS } from '../../../services/mockData';
import { ROLE_LABELS } from '../../../config/roles';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const { login, switchRole } = useAuth();
  const navigate = useNavigate();

  const handleManualLogin = (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter an email address');
      return;
    }
    const result = login(email);
    if (result.success) {
      navigate(result.redirectUrl);
    } else {
      setErrorMsg(result.message);
    }
  };

  const handleQuickDemoLogin = (user) => {
    const dest = switchRole(user.role, user.tenantId);
    navigate(dest);
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight={700} gutterBottom textAlign="center">
        Sign in to CuraCloud
      </Typography>
      <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
        Multi-Tenant Healthcare Architecture & Role-Based Access
      </Typography>

      {errorMsg && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {errorMsg}
        </Alert>
      )}

      <form onSubmit={handleManualLogin}>
        <TextField
          fullWidth
          label="Work Email Address"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. admin@apollo.curacloud.health"
          sx={{ mb: 2 }}
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          startIcon={<LoginIcon />}
          sx={{ py: 1.2, mb: 3 }}
        >
          Sign In
        </Button>
      </form>

      <Divider sx={{ my: 2 }}>
        <Typography variant="caption" color="text.secondary">
          QUICK 1-CLICK DEMO LOGIN (SELECT ROLE)
        </Typography>
      </Divider>

      <Stack spacing={1}>
        {MOCK_USERS.map((user) => (
          <Button
            key={user.id}
            variant="outlined"
            size="small"
            onClick={() => handleQuickDemoLogin(user)}
            sx={{
              justifyContent: 'space-between',
              textAlign: 'left',
              py: 1,
              px: 1.5,
              borderColor: 'grey.300',
              color: 'text.primary',
              '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.50' }
            }}
          >
            <Box>
              <Typography variant="subtitle2" fontWeight={600} fontSize="0.8rem">
                {user.name}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                {user.tenantName}
              </Typography>
            </Box>
            <Chip
              label={ROLE_LABELS[user.role]?.split(' ')[0]}
              size="small"
              color={user.role === 'SUPER_ADMIN' ? 'primary' : 'default'}
              sx={{ fontSize: '0.65rem' }}
            />
          </Button>
        ))}
      </Stack>
    </Box>
  );
};

export default LoginPage;

