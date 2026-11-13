import React from 'react';
import { Grid, Typography, Card, CardContent, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Chip } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';

import PageHeader from '../common/PageHeader';
import StatCard from '../common/StatCard';
import { useAuth } from '../../context/AuthContext';
import { MOCK_USERS } from '../../services/mockData';

export const HospitalAdminDashboard = ({ onNavigate }) => {
  const { authData } = useAuth();
  const hospitalStaff = MOCK_USERS.filter((u) => u.tenantId === authData?.hospital_id);

  return (
    <>
      <PageHeader
        title={`${authData?.hospital_name || 'Hospital'} - Admin Hub`}
        subtitle="Manage hospital departments, staff roles, internal permissions, and facility metrics."
        roleBadge="Hospital Admin"
        action={
          <Button
            variant="contained"
            startIcon={<PersonAddAlt1Icon />}
            onClick={() => onNavigate && onNavigate('staff')}
          >
            Add New Staff Member
          </Button>
        }
      />

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Registered Staff"
            value={hospitalStaff.length || 6}
            icon={PeopleAltIcon}
            color="#0284c7"
            subtitle="Under this facility"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Doctors on Duty"
            value="14"
            icon={MedicalServicesIcon}
            color="#10b981"
            subtitle="OPD & Emergency"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Hospital Bed Capacity"
            value="320"
            icon={MeetingRoomIcon}
            color="#8b5cf6"
            subtitle="76% current occupancy"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Today's Revenue"
            value="$12,840"
            icon={LocalAtmIcon}
            color="#f59e0b"
            subtitle="OPD + Inpatient billing"
          />
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 2.5, border: '1px solid #e2e8f0' }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              Hospital Personnel (Tenant: {authData?.hospital_id || 'Active'})
            </Typography>
            <Button size="small" onClick={() => onNavigate && onNavigate('staff')}>
              Manage All Staff
            </Button>
          </Stack>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Staff Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Hospital</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(hospitalStaff.length > 0 ? hospitalStaff : MOCK_USERS.slice(1, 6)).map((staff) => (
                <TableRow key={staff.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{staff.name}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>
                    <Chip label={staff.role} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{staff.tenantName || authData?.hospital_name}</TableCell>
                  <TableCell>
                    <Chip label="Active" size="small" color="success" />
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

export default HospitalAdminDashboard;

