import React from 'react';
import { Grid, Typography, Card, CardContent, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Chip } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

import PageHeader from '../common/PageHeader';
import StatCard from '../common/StatCard';

export const ReceptionistDashboard = ({ onNavigate }) => {
  const todayAppointments = [
    { id: 'APT-101', patient: 'Rahul Verma', doctor: 'Dr. Arvind Kejriwal (Cardiology)', time: '09:30 AM', status: 'Checked In' },
    { id: 'APT-102', patient: 'Anita Desai', doctor: 'Dr. Priya Singh (Pediatrics)', time: '10:15 AM', status: 'Waiting' },
    { id: 'APT-103', patient: 'Suresh Menon', doctor: 'Dr. Arvind Kejriwal (Cardiology)', time: '11:00 AM', status: 'Scheduled' },
    { id: 'APT-104', patient: 'Kavita Nair', doctor: 'Dr. Meenakshi (Orthopedics)', time: '11:30 AM', status: 'Scheduled' }
  ];

  return (
    <>
      <PageHeader
        title="Reception & Front Desk Hub"
        subtitle="Manage daily walk-ins, schedule doctor consultations, patient registration, and cashier counters."
        roleBadge="Receptionist"
        action={
          <Button
            variant="contained"
            startIcon={<PersonAddIcon />}
            onClick={() => onNavigate && onNavigate('patients')}
          >
            Register Patient
          </Button>
        }
      />

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Today's Appointments"
            value="38"
            icon={EventAvailableIcon}
            color="#0284c7"
            subtitle="12 remaining today"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="New Patient Intake"
            value="14"
            icon={HowToRegIcon}
            color="#10b981"
            subtitle="Today's registrations"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Invoices Generated"
            value="$4,280"
            icon={ReceiptLongIcon}
            color="#8b5cf6"
            subtitle="24 transactions"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Waiting Room Queue"
            value="6"
            icon={PendingActionsIcon}
            color="#f59e0b"
            subtitle="Avg wait: 12 mins"
          />
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 2.5, border: '1px solid #e2e8f0' }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              Today's Live Appointment Queue
            </Typography>
            <Button size="small" onClick={() => onNavigate && onNavigate('appointments')}>
              View All
            </Button>
          </Stack>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Token</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Assigned Doctor & Dept</TableCell>
                <TableCell>Slot Time</TableCell>
                <TableCell>Queue Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {todayAppointments.map((apt) => (
                <TableRow key={apt.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{apt.id}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{apt.patient}</TableCell>
                  <TableCell>{apt.doctor}</TableCell>
                  <TableCell>{apt.time}</TableCell>
                  <TableCell>
                    <Chip
                      label={apt.status}
                      size="small"
                      color={apt.status === 'Checked In' ? 'success' : apt.status === 'Waiting' ? 'warning' : 'default'}
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

export default ReceptionistDashboard;

