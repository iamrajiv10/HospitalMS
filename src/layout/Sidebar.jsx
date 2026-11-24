import React from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export const Sidebar = ({ menuItems = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <Box
      component="aside"
      sx={{
        width: { xs: '100%', md: '10%' },
        minWidth: { md: '150px', lg: '185px' },
        flexShrink: 0,
        bgcolor: '#ffffff',
        borderRight: '1px solid #e2e8f0',
        minHeight: { md: 'calc(100vh - 64px - 50px)' }, // Viewport minus Header and Footer
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box sx={{ p: 2, pb: 1 }}>
        <Typography
          variant="caption"
          color="text.secondary"
          fontWeight={700}
          sx={{ textTransform: 'uppercase', letterSpacing: 0.5, fontSize: '0.68rem' }}
        >
          Navigation
        </Typography>
      </Box>

      <List disablePadding sx={{ px: 1, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isSelected = location.pathname === item.path;

          return (
            <ListItem key={item.id} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                selected={isSelected}
                onClick={() => navigate(item.path)}
                sx={{
                  borderRadius: 2,
                  py: 1,
                  px: 1.5,
                  color: isSelected ? 'primary.main' : 'text.primary',
                  bgcolor: isSelected ? 'rgba(2, 132, 199, 0.08)' : 'transparent',
                  '&.Mui-selected': {
                    bgcolor: 'rgba(2, 132, 199, 0.1)',
                    '&:hover': {
                      bgcolor: 'rgba(2, 132, 199, 0.15)'
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
                      minWidth: 32,
                      color: isSelected ? 'primary.main' : 'text.secondary'
                    }}
                  >
                    <IconComponent fontSize="small" />
                  </ListItemIcon>
                )}
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: '0.8rem',
                    fontWeight: isSelected ? 700 : 500,
                    lineHeight: 1.2
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>

      <Divider />
      <Box sx={{ p: 1.5, textAlign: 'center' }}>
        <Typography variant="caption" color="text.disabled" sx={{ fontSize: '0.65rem' }}>
          Sidepanel (10%)
        </Typography>
      </Box>
    </Box>
  );
};

export default Sidebar;
