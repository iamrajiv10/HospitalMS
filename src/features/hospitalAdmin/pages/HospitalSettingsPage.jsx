import React from 'react';
import { Card, CardContent, Grid, TextField, Button, Box, Divider, Typography } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PageHeader from '../../../components/common/PageHeader';
import { useTenant } from '../../../contexts/TenantContext';
import { useNotification } from '../../../contexts/NotificationContext';

export const HospitalSettingsPage = () => {
  const { currentHospital } = useTenant();
  const { showNotification } = useNotification();

  const handleSave = (e) => {
    e.preventDefault();
    showNotification('Hospital profile settings updated successfully.', 'success');
  };

  return (
    <>
      <PageHeader
        title="Hospital Tenant Configuration"
        subtitle="Manage hospital metadata, emergency lines, departments, and billing identifiers."
        roleBadge="Hospital Admin"
      />

      <Card sx={{ maxWidth: 800 }}>
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSave}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Facility Details
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Hospital Legal Name"
                  defaultValue={currentHospital?.name || 'Apollo Multispeciality Hospital'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  disabled
                  label="Tenant Domain Identifier"
                  defaultValue={currentHospital?.domain || 'apollo.curacloud.health'}
                  helperText="Managed by Platform Super Admin"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Official Address"
                  defaultValue={currentHospital?.address || 'Greams Road, Thousand Lights, Chennai, TN'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Emergency Hotline Contact"
                  defaultValue="+91 (044) 2829-0200"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Hospital Tax / Registration ID"
                  defaultValue="HOSP-REG-TN-98210"
                />
              </Grid>

              <Grid item xs={12}>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button type="submit" variant="contained" color="primary" startIcon={<SaveIcon />}>
                    Save Hospital Settings
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default HospitalSettingsPage;

