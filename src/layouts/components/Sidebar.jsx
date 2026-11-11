import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Stack
} from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { ROLE_NAVIGATION } from '../../routes/navigationConfig';
import { APP_CONFIG } from '../../config/constants';
import { ROLE_LABELS } from '../../config/roles';

export const Sidebar = ({ mobileOpen, onDrawerClose }) => {
  const { role } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = (role && ROLE_NAVIGATION[role]) || [];

  const handleNavigate = (path) => {
    navigate(path);
    if (mobileOpen) {
      onDrawerClose();
    }
  };

  const drawerContent = (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Brand Header */}
      <Box sx={{ px: 3, py: 2.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 2,
            bgcolor: 'primary.main',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(2, 132, 199, 0.35)'
          }}
        >
          <LocalHospitalIcon />
        </Box>
        <Box>
          <Typography variant="h6" fontWeight={800} color="text.primary" sx={{ letterSpacing: -0.5 }}>
            CuraCloud
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
            Multi-Tenant SaaS
          </Typography>
        </Box>
      </Box>

      <Divider />

      {/* Role Context Tag */}
      <Box sx={{ px: 3, py: 2 }}>
        <Typography variant="caption" color="text.secondary" fontWeight={700} sx={{ textTransform: 'uppercase' }}>
          Role Workspace
        </Typography>
        <Typography variant="body2" fontWeight={600} color="primary.main">
          {ROLE_LABELS[role] || 'Standard Access'}
        </Typography>
      </Box>

      {/* Navigation Links */}
      <Box sx={{ flexGrow: 1, px: 2 }}>
        <List disablePadding>
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <ListItem key={item.path} disablePadding sx={{ mb: 0.75 }}>
                <ListItemButton
                  onClick={() => handleNavigate(item.path)}
                  selected={isActive}
                  sx={{
                    borderRadius: 2,
                    py: 1.2,
                    px: 2,
                    color: isActive ? 'primary.main' : 'text.primary',
                    bgcolor: isActive ? 'primary.50' : 'transparent',
                    fontWeight: isActive ? 600 : 400,
                    '&.Mui-selected': {
                      bgcolor: 'rgba(2, 132, 199, 0.08)',
                      '&:hover': {
                        bgcolor: 'rgba(2, 132, 199, 0.12)'
                      }
                    },
                    '&:hover': {
                      bgcolor: 'grey.100'
                    }
                  }}
                >
                  {IconComponent && (
                    <ListItemIcon
                      sx={{
                        minWidth: 38,
                        color: isActive ? 'primary.main' : 'text.secondary'
                      }}
                    >
                      <IconComponent fontSize="small" />
                    </ListItemIcon>
                  )}
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 600 : 500
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>

      {/* Bottom SaaS Footer */}
      <Box sx={{ p: 2, borderTop: '1px solid #e2e8f0', bgcolor: 'grey.50' }}>
        <Typography variant="caption" color="text.secondary" display="block">
          CuraCloud Enterprise v{APP_CONFIG.APP_VERSION}
        </Typography>
        <Typography variant="caption" color="text.disabled">
          Tenant Isolation Active
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { md: APP_CONFIG.DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onDrawerClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: APP_CONFIG.DRAWER_WIDTH }
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop Persistent Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: APP_CONFIG.DRAWER_WIDTH,
            borderRight: '1px solid #e2e8f0'
          }
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
};

export default Sidebar;

