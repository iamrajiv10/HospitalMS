import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Card,
  CardContent,
  Stack
} from '@mui/material';
import DomainAddIcon from '@mui/icons-material/DomainAdd';
import PageHeader from '../../../components/common/PageHeader';
import { useNotification } from '../../../contexts/NotificationContext';

export const HospitalOnboardingPage = () => {
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    hospitalName: '',
    subdomain: '',
    adminName: '',
    adminEmail: '',
    subscriptionTier: 'Pro',
    bedCapacity: 150
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    showNotification(`Tenant "${formData.hospitalName}" created successfully!`, 'success');
  };

  return (
    <Box>
      <PageHeader
        title="Onboard New Hospital Tenant"
        subtitle="Provision isolated tenant database, tenant subdomain and Hospital Admin credentials."
        roleBadge="SaaS Super Admin"
      />

      <Card sx={{ maxWidth: 800 }}>
        <CardContent sx={{ p: 4 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Hospital Legal Name"
                  name="hospitalName"
                  value={formData.hospitalName}
                  onChange={handleChange}
                  placeholder="e.g. City General Hospital"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Dedicated Subdomain"
                  name="subdomain"
                  value={formData.subdomain}
                  onChange={handleChange}
                  placeholder="cityhospital.curacloud.health"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  label="Hospital Admin Full Name"
                  name="adminName"
                  value={formData.adminName}
                  onChange={handleChange}
                  placeholder="Dr. John Doe"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  required
                  type="email"
                  label="Hospital Admin Email"
                  name="adminEmail"
                  value={formData.adminEmail}
                  onChange={handleChange}
                  placeholder="admin@cityhospital.com"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  select
                  label="Subscription Plan Tier"
                  name="subscriptionTier"
                  value={formData.subscriptionTier}
                  onChange={handleChange}
                >
                  <MenuItem value="Starter">Starter (Up to 50 beds)</MenuItem>
                  <MenuItem value="Pro">Pro (Up to 300 beds)</MenuItem>
                  <MenuItem value="Enterprise">Enterprise (Unlimited beds & custom integrations)</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Initial Bed Capacity"
                  name="bedCapacity"
                  value={formData.bedCapacity}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                  <Button variant="outlined" color="inherit">
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    startIcon={<DomainAddIcon />}
                  >
                    Deploy New Hospital Tenant
                  </Button>
                </Stack>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default HospitalOnboardingPage;

