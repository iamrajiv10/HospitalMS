import React, { useState } from 'react';
import { Card, CardContent, Grid, TextField, Button, Box, Divider, Typography, Alert } from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import PageHeader from '../common/PageHeader';
import { useAuth } from '../../context/AuthContext';

export const HospitalSettingsPage = () => {
  const { authData } = useAuth();
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <>
      <PageHeader
        title="Hospital Tenant Configuration"
        subtitle="Manage hospital metadata, emergency lines, departments, and billing identifiers."
        roleBadge="Hospital Admin"
      />

      {saved && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Hospital profile settings updated successfully.
        </Alert>
      )}

      <Card sx={{ maxWidth: 800, borderRadius: 2.5, border: '1px solid #e2e8f0' }}>
        <CardContent sx={{ p: 3.5 }}>
          <form onSubmit={handleSave}>
            <Grid container spacing={2.5}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Facility Profile
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Hospital Legal Name"
                  defaultValue={authData?.hospital_name || 'Apollo Multispeciality Hospital'}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  disabled
                  label="Tenant Identifier"
                  defaultValue={authData?.hospital_id || 'hosp-apollo'}
                  helperText="Managed by Platform Super Admin"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Official Address"
                  defaultValue="Greams Road, Thousand Lights, Chennai, TN"
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
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
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

