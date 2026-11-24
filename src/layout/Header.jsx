import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Chip
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useNavigate } from 'react-router-dom';
import { useAuth, PRESET_USERS } from '../context/AuthContext';
import { ROLE_LABELS, ROLE_HOME_ROUTES } from '../config/roles';

export const Header = () => {
  const { authData, logout, switchRole } = useAuth();
  const navigate = useNavigate();
  const [profileAnchor, setProfileAnchor] = useState(null);
  const [roleAnchor, setRoleAnchor] = useState(null);

  const handleProfileOpen = (e) => setProfileAnchor(e.currentTarget);
  const handleProfileClose = () => setProfileAnchor(null);

  const handleRoleOpen = (e) => setRoleAnchor(e.currentTarget);
  const handleRoleClose = () => setRoleAnchor(null);

  const handleSelectRole = (targetRole, hospitalId) => {
    switchRole(targetRole, hospitalId);
    handleRoleClose();
    if (ROLE_HOME_ROUTES[targetRole]) {
      navigate(ROLE_HOME_ROUTES[targetRole]);
    }
  };

  const handleLogout = () => {
    handleProfileClose();
    logout();
    navigate('/');
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        bgcolor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        color: '#0f172a',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: 64, px: { xs: 2, md: 3 } }}>
        {/* Left Corner: Hospital Logo + Hospital Name from API response */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          {authData?.hospital_logo ? (
            <Avatar
              src={authData.hospital_logo}
              alt={authData?.hospital_name || 'Hospital Logo'}
              variant="rounded"
              sx={{ width: 38, height: 38, border: '1px solid #e2e8f0' }}
            />
          ) : (
            <Box
              sx={{
                width: 38,
                height: 38,
                borderRadius: 2,
                bgcolor: 'primary.main',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <LocalHospitalIcon fontSize="small" />
            </Box>
          )}

          <Box>
            <Typography variant="subtitle1" fontWeight={700} lineHeight={1.2} color="text.primary">
              {authData?.hospital_name || 'Hospital Management System'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              Tenant ID: <b>{authData?.hospital_id || 'N/A'}</b>
            </Typography>
          </Box>
        </Box>

        {/* Right Corner: Name of the logged in user, his role + Switcher / Logout */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Quick Role Switcher Demo Menu */}
          <Button
            size="small"
            variant="outlined"
            color="primary"
            startIcon={<SwapHorizIcon />}
            onClick={handleRoleOpen}
            sx={{ display: { xs: 'none', sm: 'inline-flex' }, borderRadius: 2, textTransform: 'none' }}
          >
            Role: {ROLE_LABELS[authData?.role]?.split(' ')[0] || authData?.role}
          </Button>

          <Menu
            anchorEl={roleAnchor}
            open={Boolean(roleAnchor)}
            onClose={handleRoleClose}
            PaperProps={{ sx: { minWidth: 260, borderRadius: 2, mt: 1.5 } }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={700}>
                SIMULATE LOGIN AS ROLE
              </Typography>
            </Box>
            <Divider />
            {PRESET_USERS.map((preset) => (
              <MenuItem
                key={preset.email}
                onClick={() => handleSelectRole(preset.role, preset.hospital_id)}
                selected={authData?.role === preset.role && authData?.hospital_id === preset.hospital_id}
              >
                <ListItemText
                  primary={preset.role.replace('_', ' ')}
                  secondary={`${preset.user_name} (${preset.hospital_name.split(' ')[0]})`}
                  primaryTypographyProps={{ fontSize: '0.85rem', fontWeight: 600 }}
                  secondaryTypographyProps={{ fontSize: '0.75rem' }}
                />
              </MenuItem>
            ))}
          </Menu>

          {/* User info & avatar */}
          <Box
            onClick={handleProfileOpen}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.25,
              cursor: 'pointer',
              p: 0.5,
              borderRadius: 2,
              '&:hover': { bgcolor: 'grey.100' }
            }}
          >
            <Avatar sx={{ width: 36, height: 36, bgcolor: 'primary.main', fontSize: '0.9rem', fontWeight: 600 }}>
              {authData?.user_name ? authData.user_name.charAt(0) : 'U'}
            </Avatar>
            <Box sx={{ display: { xs: 'none', md: 'block' }, textAlign: 'left' }}>
              <Typography variant="body2" fontWeight={600} lineHeight={1.2}>
                {authData?.user_name || 'Logged User'}
              </Typography>
              <Chip
                label={ROLE_LABELS[authData?.role] || authData?.role || 'User'}
                size="small"
                color="primary"
                variant="outlined"
                sx={{ height: 18, fontSize: '0.65rem', fontWeight: 600, mt: 0.3 }}
              />
            </Box>
          </Box>

          <Menu
            anchorEl={profileAnchor}
            open={Boolean(profileAnchor)}
            onClose={handleProfileClose}
            PaperProps={{ sx: { minWidth: 220, borderRadius: 2, mt: 1.5 } }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" fontWeight={600}>
                {authData?.user_name}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block">
                {authData?.user_email}
              </Typography>
              <Typography variant="caption" color="primary.main" fontWeight={600}>
                Role: {authData?.role}
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" color="error" />
              </ListItemIcon>
              <ListItemText primary="Log out" />
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
