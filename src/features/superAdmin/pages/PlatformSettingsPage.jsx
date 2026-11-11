import React from 'react';
import { Card, CardContent, Typography, Switch, FormControlLabel, Stack, Button, Divider, Box } from '@mui/material';
import PageHeader from '../../../components/common/PageHeader';
import { useNotification } from '../../../contexts/NotificationContext';

export const PlatformSettingsPage = () => {
  const { showNotification } = useNotification();

  const handleSave = () => {
    showNotification('Global platform settings updated.', 'success');
  };

  return (
    <>
      <PageHeader
        title="Platform Global Settings"
        subtitle="Global security policies, multi-tenant database routing, and maintenance flags."
        roleBadge="Super Admin"
      />

      <Card sx={{ maxWidth: 800 }}>
        <CardContent sx={{ p: 4 }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                Multi-Tenancy Security & Strict Isolation
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                Enforce mandatory X-Tenant-ID verification on all API gateway endpoints.
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked color="primary" />}
                label="Enforce strict tenant data perimeter (Prevent cross-tenant leaks)"
              />
            </Box>

            <Divider />

            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                Automated Tenant Provisioning
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                Instantly provision database schemas upon online subscription checkout.
              </Typography>
              <FormControlLabel
                control={<Switch defaultChecked color="primary" />}
                label="Enable self-service hospital onboarding"
              />
            </Box>

            <Divider />

            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                System Maintenance Mode
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                Temporarily pause new hospital registrations for scheduled database upgrades.
              </Typography>
              <FormControlLabel
                control={<Switch color="warning" />}
                label="Enable Platform Maintenance Mode"
              />
            </Box>

            <Box sx={{ pt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleSave}>
                Save Global Configurations
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </>
  );
};

export default PlatformSettingsPage;

