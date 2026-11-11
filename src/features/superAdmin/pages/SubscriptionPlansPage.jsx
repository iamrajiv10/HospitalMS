import React from 'react';
import { Grid, Card, CardContent, Typography, Button, Box, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PageHeader from '../../../components/common/PageHeader';

export const SubscriptionPlansPage = () => {
  const plans = [
    {
      name: 'Starter Hospital',
      price: '$499 / mo',
      desc: 'Ideal for local clinics and small regional hospitals.',
      features: ['Up to 50 active beds', 'Up to 25 staff accounts', 'Patient Registration & Appointments', 'Basic Billing module'],
      popular: false
    },
    {
      name: 'Pro Healthcare',
      price: '$1,299 / mo',
      desc: 'Comprehensive multi-department hospital suite.',
      features: ['Up to 300 active beds', 'Unlimited staff accounts', 'Doctor EMR & Digital Prescriptions', 'Ward & Bed Manager', 'Pharmacy & Inventory Hub'],
      popular: true
    },
    {
      name: 'Enterprise Network',
      price: '$3,499 / mo',
      desc: 'Multi-branch hospitals and high-capacity institutions.',
      features: ['Unlimited beds & wards', 'Custom subdomains & white-labeling', 'Dedicated database instance', '24/7 SLA & priority phone support', 'Audit logging & compliance'],
      popular: false
    }
  ];

  return (
    <>
      <PageHeader
        title="SaaS Subscription Tiers"
        subtitle="Manage hospital licensing models, bed quotas, and automated recurring billing."
        roleBadge="Super Admin"
      />

      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.name}>
            <Card
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: plan.popular ? '2px solid #0284c7' : '1px solid #e2e8f0',
                position: 'relative'
              }}
            >
              {plan.popular && (
                <Chip
                  label="Most Popular"
                  color="primary"
                  size="small"
                  sx={{ position: 'absolute', top: 16, right: 16, fontWeight: 600 }}
                />
              )}
              <CardContent sx={{ p: 4, flexGrow: 1 }}>
                <Typography variant="h6" fontWeight={700} gutterBottom>
                  {plan.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ minHeight: 40, mb: 2 }}>
                  {plan.desc}
                </Typography>
                <Typography variant="h4" fontWeight={800} color="primary.main" sx={{ mb: 3 }}>
                  {plan.price}
                </Typography>

                <List disablePadding>
                  {plan.features.map((feat) => (
                    <ListItem key={feat} disableGutters sx={{ py: 0.75 }}>
                      <ListItemIcon sx={{ minWidth: 28, color: 'success.main' }}>
                        <CheckCircleOutlineIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={feat} primaryTypographyProps={{ fontSize: '0.85rem' }} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
              <Box sx={{ p: 3, pt: 0 }}>
                <Button fullWidth variant={plan.popular ? 'contained' : 'outlined'} color="primary">
                  Configure Plan
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default SubscriptionPlansPage;

