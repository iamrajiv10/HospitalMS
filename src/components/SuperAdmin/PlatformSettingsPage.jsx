import React, { useState } from 'react';
import { Card, CardContent, Typography, Switch, FormControlLabel, Stack, Button, Divider, Box, Alert } from '@mui/material';
import PageHeader from '../common/PageHeader';

export const PlatformSettingsPage = () => {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <PageHeader
        title="Platform Global Settings"
        subtitle="Global security policies, multi-tenant database routing, and maintenance flags."
        roleBadge="Super Admin"
      />

      {saved && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Platform settings updated successfully.
        </Alert>
      )}

      <Card sx={{ maxWidth: 800, borderRadius: 2.5, border: '1px solid #e2e8f0' }}>
        <CardContent sx={{ p: 3.5 }}>
          <Stack spacing={3}>
            <Box>
              <Typography variant="subtitle1" fontWeight={600}>
                Multi-Tenancy Security & Strict Isolation
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
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
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
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
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                Temporarily pause new registrations for scheduled maintenance.
              </Typography>
              <FormControlLabel
                control={<Switch color="warning" />}
                label="Enable Platform Maintenance Mode"
              />
            </Box>

            <Box sx={{ pt: 1 }}>
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

