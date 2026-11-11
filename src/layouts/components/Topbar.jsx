import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
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
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContext';
import TenantIndicator from './TenantIndicator';
import { ROLES, ROLE_LABELS } from '../../config/roles';

export const Topbar = ({ onDrawerToggle }) => {
  const { currentUser, role, logout, switchRole } = useAuth();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [roleMenuAnchor, setRoleMenuAnchor] = useState(null);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);

  const handleRoleMenuOpen = (event) => setRoleMenuAnchor(event.currentTarget);
  const handleRoleMenuClose = () => setRoleMenuAnchor(null);

  const handleRoleSelect = (targetRole, tenantId) => {
    handleRoleMenuClose();
    const destination = switchRole(targetRole, tenantId);
    navigate(destination);
  };

  const handleLogout = () => {
    handleProfileMenuClose();
    logout();
    navigate('/login');
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        color: '#0f172a',
        zIndex: (theme) => theme.zIndex.drawer + 1
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: { xs: 64, sm: 70 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={onDrawerToggle}
            sx={{ mr: 1, display: { md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <TenantIndicator />
        </Box>

        {/* Right side controls: Role Quick Switcher & User Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Quick Role Switcher for Developer / Preview */}
          <Button
            size="small"
            variant="outlined"
            color="primary"
            startIcon={<SwapHorizIcon />}
            onClick={handleRoleMenuOpen}
            sx={{ display: { xs: 'none', sm: 'flex' }, borderRadius: 2 }}
          >
            Switch Role ({ROLE_LABELS[role]?.split(' ')[0] || 'Role'})
          </Button>

          <Menu
            anchorEl={roleMenuAnchor}
            open={Boolean(roleMenuAnchor)}
            onClose={handleRoleMenuClose}
            PaperProps={{ sx: { minWidth: 280, borderRadius: 2, mt: 1.5 } }}
          >
            <Box sx={{ px: 2, py: 1 }}>
              <Typography variant="caption" color="text.secondary" fontWeight={600}>
                PREVIEW AS ROLE (MULTI-TENANT DEMO)
              </Typography>
            </Box>
            <Divider />
            <MenuItem onClick={() => handleRoleSelect(ROLES.SUPER_ADMIN)}>
              <ListItemText
                primary="Super Admin"
                secondary="Platform-wide global access"
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </MenuItem>
            <MenuItem onClick={() => handleRoleSelect(ROLES.HOSPITAL_ADMIN, 'hosp-apollo')}>
              <ListItemText
                primary="Hospital Admin (Apollo)"
                secondary="Staff & settings for Apollo Hospital"
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </MenuItem>
            <MenuItem onClick={() => handleRoleSelect(ROLES.HOSPITAL_ADMIN, 'hosp-fortis')}>
              <ListItemText
                primary="Hospital Admin (Fortis)"
                secondary="Test tenant isolation against Fortis Hospital"
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </MenuItem>
            <MenuItem onClick={() => handleRoleSelect(ROLES.RECEPTIONIST)}>
              <ListItemText
                primary="Receptionist"
                secondary="Patients, Appointments, Billing"
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </MenuItem>
            <MenuItem onClick={() => handleRoleSelect(ROLES.DOCTOR)}>
              <ListItemText
                primary="Doctor"
                secondary="Clinical records & prescriptions"
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </MenuItem>
            <MenuItem onClick={() => handleRoleSelect(ROLES.INVENTORY_MANAGER)}>
              <ListItemText
                primary="Inventory Manager"
                secondary="Medicines, stock & suppliers"
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </MenuItem>
            <MenuItem onClick={() => handleRoleSelect(ROLES.WARD_MANAGER)}>
              <ListItemText
                primary="Ward Manager"
                secondary="Beds, wards, admissions & discharges"
                primaryTypographyProps={{ fontWeight: 600 }}
              />
            </MenuItem>
          </Menu>

          {/* User profile dropdown */}
          <Box
            onClick={handleProfileMenuOpen}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              cursor: 'pointer',
              p: 0.5,
              borderRadius: 2,
              '&:hover': { bgcolor: 'grey.100' }
            }}
          >
            <Avatar
              alt={currentUser?.name}
              src={currentUser?.avatar}
              sx={{ width: 38, height: 38, bgcolor: 'primary.main' }}
            >
              {currentUser?.name?.charAt(0) || 'U'}
            </Avatar>
            <Box sx={{ display: { xs: 'none', lg: 'block' }, textAlign: 'left' }}>
              <Typography variant="subtitle2" fontWeight={600} lineHeight={1.2}>
                {currentUser?.name || 'User'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {ROLE_LABELS[role] || 'Member'}
              </Typography>
            </Box>
          </Box>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
            PaperProps={{ sx: { width: 240, borderRadius: 2, mt: 1.5 } }}
          >
            <Box sx={{ px: 2, py: 1.5 }}>
              <Typography variant="subtitle2" fontWeight={600}>
                {currentUser?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" noWrap>
                {currentUser?.email}
              </Typography>
              <Chip
                icon={<VerifiedUserIcon />}
                label={currentUser?.role}
                size="small"
                color="primary"
                sx={{ mt: 1, fontSize: '0.65rem' }}
              />
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

export default Topbar;

