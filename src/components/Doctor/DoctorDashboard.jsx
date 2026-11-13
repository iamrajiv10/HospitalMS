import React from 'react';
import { Grid, Typography, Card, CardContent, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Chip } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import MedicationIcon from '@mui/icons-material/Medication';
import BiotechIcon from '@mui/icons-material/Biotech';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EditNoteIcon from '@mui/icons-material/EditNote';

import PageHeader from '../common/PageHeader';
import StatCard from '../common/StatCard';

export const DoctorDashboard = ({ onNavigate }) => {
  const patientsQueue = [
    { token: 'T-12', name: 'Rahul Verma', reason: 'Hypertension Follow-up', vitals: 'BP 138/88, Pulse 76', status: 'In Consultation' },
    { token: 'T-14', name: 'Suresh Menon', reason: 'Chest Discomfort / Angina check', vitals: 'BP 145/92, Pulse 84', status: 'Next Up' },
    { token: 'T-17', name: 'Meera Iyer', reason: 'Routine Diabetic Review', vitals: 'BP 120/80, Fasting 110', status: 'Waiting' }
  ];

  return (
    <>
      <PageHeader
        title="Doctor Clinical Workspace"
        subtitle="Review assigned patient queues, medical records, diagnosis logs, and e-prescriptions."
        roleBadge="Doctor"
        action={
          <Button
            variant="contained"
            startIcon={<EditNoteIcon />}
            onClick={() => onNavigate && onNavigate('prescriptions')}
          >
            New Prescription
          </Button>
        }
      />

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="OPD Queue"
            value="8"
            icon={PeopleIcon}
            color="#0284c7"
            subtitle="3 completed today"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Prescriptions Written"
            value="19"
            icon={MedicationIcon}
            color="#10b981"
            subtitle="Today's digital Rx"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending Lab Results"
            value="4"
            icon={BiotechIcon}
            color="#f59e0b"
            subtitle="CBC, Lipid, Troponin"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Avg Consultation Time"
            value="14m"
            icon={AccessTimeIcon}
            color="#8b5cf6"
            subtitle="Target: under 15m"
          />
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 2.5, border: '1px solid #e2e8f0' }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              Today's Consultation Lineup
            </Typography>
            <Button size="small" onClick={() => onNavigate && onNavigate('patients')}>
              Access Full Records
            </Button>
          </Stack>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Queue #</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Reason for Visit</TableCell>
                <TableCell>Recorded Vitals</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patientsQueue.map((item) => (
                <TableRow key={item.token} hover>
                  <TableCell sx={{ fontWeight: 700 }}>{item.token}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{item.name}</TableCell>
                  <TableCell>{item.reason}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{item.vitals}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      size="small"
                      color={item.status === 'In Consultation' ? 'primary' : item.status === 'Next Up' ? 'warning' : 'default'}
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

export default DoctorDashboard;

