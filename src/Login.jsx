import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Divider,
  Stack,
  Alert,
  Chip,
  Container,
  InputAdornment,
  IconButton
} from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';
import { useAuth, PRESET_USERS } from './context/AuthContext';
import { ROLE_LABELS, ROLE_HOME_ROUTES } from './config/roles';

export const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) {
      setErrorMsg('Please enter your work email');
      return;
    }
    setLoading(true);
    try {
      const result = await login(email, password);
      if (result.success) {
        const dest = ROLE_HOME_ROUTES[result.data.role] || '/hospital-admin/dashboard';
        navigate(dest);
      }
    } catch (err) {
      setErrorMsg('Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (preset) => {
    setEmail(preset.email);
    setPassword('demo@123');
    setLoading(true);
    const result = await login(preset.email, 'demo@123');
    setLoading(false);
    if (result.success) {
      const dest = ROLE_HOME_ROUTES[preset.role] || '/hospital-admin/dashboard';
      navigate(dest);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f1f5f9',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2
      }}
    >
      {/* Brand Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: 2.5,
            bgcolor: 'primary.main',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 14px rgba(2, 132, 199, 0.4)'
          }}
        >
          <LocalHospitalIcon fontSize="medium" />
        </Box>
        <Box>
          <Typography variant="h5" fontWeight={800} color="text.primary" sx={{ letterSpacing: -0.5 }}>
            CuraCloud SaaS
          </Typography>
          <Typography variant="caption" color="text.secondary" fontWeight={500}>
            Unified Multi-Tenant Hospital Management Platform
          </Typography>
        </Box>
      </Box>

      <Container maxWidth="sm">
        <Card sx={{ p: { xs: 2.5, sm: 4 }, borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
          <CardContent sx={{ p: '0 !important' }}>
            <Typography variant="h6" fontWeight={700} textAlign="center" gutterBottom>
              Unified Hospital Portal Login
            </Typography>
            <Typography variant="body2" color="text.secondary" textAlign="center" sx={{ mb: 3 }}>
              Enter your credentials. The platform will dynamically detect your role and hospital tenant.
            </Typography>

            {errorMsg && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {errorMsg}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Official Work Email"
                variant="outlined"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. doctor@apollo.curacloud.health"
                sx={{ mb: 2 }}
                size="small"
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                variant="outlined"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                sx={{ mb: 2.5 }}
                size="small"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        size="small"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                startIcon={<LoginIcon />}
                disabled={loading}
                sx={{ py: 1.2, fontWeight: 700 }}
              >
                {loading ? 'Authenticating...' : 'Sign In'}
              </Button>
            </form>

            <Divider sx={{ my: 3 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                OR CHOOSE A DEMO ROLE TO LOGIN INSTANTLY
              </Typography>
            </Divider>

            <Stack spacing={1}>
              {PRESET_USERS.map((preset) => (
                <Button
                  key={preset.email}
                  variant="outlined"
                  size="small"
                  onClick={() => handleQuickLogin(preset)}
                  sx={{
                    justifyContent: 'space-between',
                    textAlign: 'left',
                    py: 0.8,
                    px: 1.5,
                    borderColor: '#e2e8f0',
                    color: 'text.primary',
                    '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.50' }
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600} fontSize="0.78rem">
                      {preset.user_name}
                    </Typography>
                    <Typography variant="caption" color="text.secondary" display="block">
                      {preset.hospital_name}
                    </Typography>
                  </Box>
                  <Chip
                    label={ROLE_LABELS[preset.role]?.split(' ')[0] || preset.role}
                    size="small"
                    color={preset.role === 'SUPER_ADMIN' ? 'secondary' : 'primary'}
                    sx={{ fontSize: '0.65rem', height: 20 }}
                  />
                </Button>
              ))}
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default Login;
