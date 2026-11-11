import React from 'react';
import { Grid, Typography, Card, CardContent, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Chip } from '@mui/material';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from 'react-router-dom';

import PageHeader from '../../../components/common/PageHeader';
import StatCard from '../../../components/common/StatCard';
import { useTenant } from '../../../contexts/TenantContext';
import { MOCK_USERS } from '../../../services/mockData';

export const HospitalAdminDashboard = () => {
  const { currentHospital, tenantId } = useTenant();
  const navigate = useNavigate();

  // Filter staff to ONLY this tenant - Demonstrates tenant isolation!
  const hospitalStaff = MOCK_USERS.filter((u) => u.tenantId === tenantId);

  return (
    <>
      <PageHeader
        title={`${currentHospital?.name || 'Hospital'} - Admin Hub`}
        subtitle="Manage hospital departments, staff roles, internal permissions, and facility metrics."
        roleBadge="Hospital Admin"
        action={
          <Button
            variant="contained"
            startIcon={<PersonAddAlt1Icon />}
            onClick={() => navigate('/hospital-admin/staff')}
          >
            Add New Staff Member
          </Button>
        }
      />

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Registered Staff"
            value={hospitalStaff.length}
            icon={PeopleAltIcon}
            color="#0284c7"
            subtitle="Under this hospital"
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
            value={currentHospital?.activeBeds || 320}
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

      {/* Staff directory for this tenant */}
      <Card>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              Internal Hospital Personnel (Isolated Tenant: {currentHospital?.id})
            </Typography>
            <Button size="small" onClick={() => navigate('/hospital-admin/staff')}>
              Manage All Staff
            </Button>
          </Stack>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Staff Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Assigned Role</TableCell>
                <TableCell>Hospital Tenant</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hospitalStaff.map((staff) => (
                <TableRow key={staff.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{staff.name}</TableCell>
                  <TableCell>{staff.email}</TableCell>
                  <TableCell>
                    <Chip label={staff.role} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{staff.tenantName}</TableCell>
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

