import React from 'react';
import { Grid, Typography, Card, CardContent, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Chip } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AddTaskIcon from '@mui/icons-material/AddTask';

import PageHeader from '../common/PageHeader';
import StatCard from '../common/StatCard';

export const WardDashboard = ({ onNavigate }) => {
  const wardOverview = [
    { ward: 'Intensive Care Unit (ICU)', totalBeds: 24, occupied: 21, available: 3, occupancy: '87.5%' },
    { ward: 'Cardiac Care Unit (CCU)', totalBeds: 18, occupied: 14, available: 4, occupancy: '77.7%' },
    { ward: 'General Medical Ward A', totalBeds: 60, occupied: 45, available: 15, occupancy: '75.0%' },
    { ward: 'Surgical Recovery Ward', totalBeds: 40, occupied: 28, available: 12, occupancy: '70.0%' },
    { ward: 'Pediatric Ward', totalBeds: 30, occupied: 18, available: 12, occupancy: '60.0%' }
  ];

  return (
    <>
      <PageHeader
        title="Ward & Inpatient Bed Command"
        subtitle="Live ward occupancy rates, bed allocation, admitted patient tracking, and discharge clearance."
        roleBadge="Ward Manager"
        action={
          <Button
            variant="contained"
            startIcon={<AddTaskIcon />}
            onClick={() => onNavigate && onNavigate('beds')}
          >
            Allocate Bed
          </Button>
        }
      />

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Inpatient Beds"
            value="172"
            icon={HotelIcon}
            color="#0284c7"
            subtitle="Across 5 active wards"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Available Vacant Beds"
            value="46"
            icon={MeetingRoomIcon}
            color="#10b981"
            subtitle="Ready for intake"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Current Occupancy"
            value="73.2%"
            icon={LocalHospitalIcon}
            color="#8b5cf6"
            subtitle="126 active patients"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Discharges Today"
            value="9"
            icon={ExitToAppIcon}
            color="#f59e0b"
            subtitle="Clearances pending: 2"
          />
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 2.5, border: '1px solid #e2e8f0' }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              Hospital Ward Occupancy Live Summary
            </Typography>
            <Button size="small" onClick={() => onNavigate && onNavigate('beds')}>
              View Bed Matrix
            </Button>
          </Stack>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Ward Section</TableCell>
                <TableCell>Total Bed Count</TableCell>
                <TableCell>Occupied</TableCell>
                <TableCell>Available</TableCell>
                <TableCell>Occupancy Rate</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {wardOverview.map((item) => (
                <TableRow key={item.ward} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{item.ward}</TableCell>
                  <TableCell>{item.totalBeds}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{item.occupied}</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'success.main' }}>{item.available}</TableCell>
                  <TableCell>{item.occupancy}</TableCell>
                  <TableCell>
                    <Chip
                      label={parseFloat(item.occupancy) > 80 ? 'High Demand' : 'Normal'}
                      size="small"
                      color={parseFloat(item.occupancy) > 80 ? 'warning' : 'success'}
                    />
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

export default WardDashboard;

