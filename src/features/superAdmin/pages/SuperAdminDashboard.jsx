import React from 'react';
import { Grid, Typography, Card, CardContent, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Chip } from '@mui/material';
import DomainIcon from '@mui/icons-material/Domain';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import DnsIcon from '@mui/icons-material/Dns';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';

import PageHeader from '../../../components/common/PageHeader';
import StatCard from '../../../components/common/StatCard';
import { MOCK_HOSPITALS } from '../../../services/mockData';

export const SuperAdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title="Super Admin Platform Hub"
        subtitle="Global multi-tenant governance, subscription overview, and tenant provisioning."
        roleBadge="Super Admin"
        action={
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => navigate('/super-admin/hospitals/new')}
          >
            Onboard New Hospital
          </Button>
        }
      />

      {/* High level SaaS Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Onboarded Hospitals"
            value={MOCK_HOSPITALS.length}
            icon={DomainIcon}
            color="#0284c7"
            subtitle="Across 3 regions"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Platform Monthly Recurring"
            value="$48,250"
            icon={MonetizationOnIcon}
            color="#10b981"
            subtitle="+14% from last month"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Hospital Staff"
            value="1,420"
            icon={PeopleAltIcon}
            color="#8b5cf6"
            subtitle="Doctors, Admins, Nurses"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="SaaS Infrastructure Uptime"
            value="99.98%"
            icon={DnsIcon}
            color="#0d9488"
            subtitle="Tenant databases healthy"
          />
        </Grid>
      </Grid>

      {/* Hospitals Directory Preview */}
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              Hospital Tenants Directory
            </Typography>
            <Button size="small" onClick={() => navigate('/super-admin/hospitals')}>
              View All ({MOCK_HOSPITALS.length})
            </Button>
          </Stack>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Hospital Name</TableCell>
                <TableCell>Tenant Code</TableCell>
                <TableCell>Custom Subdomain</TableCell>
                <TableCell>Subscription Tier</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MOCK_HOSPITALS.map((hospital) => (
                <TableRow key={hospital.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{hospital.name}</TableCell>
                  <TableCell>{hospital.code}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{hospital.domain}</TableCell>
                  <TableCell>
                    <Chip label={hospital.tier} size="small" variant="outlined" color="primary" />
                  </TableCell>
                  <TableCell>
                    <Chip label={hospital.status} size="small" color="success" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default SuperAdminDashboard;

