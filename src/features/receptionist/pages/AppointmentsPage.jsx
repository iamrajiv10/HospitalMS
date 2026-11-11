import React from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Chip, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from '../../../components/common/PageHeader';

export const AppointmentsPage = () => {
  const appointments = [
    { id: 'APT-201', patient: 'Rahul Verma', doctor: 'Dr. Arvind Kejriwal', dept: 'Cardiology', date: '2026-11-11', slot: '10:00 AM', type: 'Follow-up', status: 'Confirmed' },
    { id: 'APT-202', patient: 'Anita Desai', doctor: 'Dr. Priya Singh', dept: 'Pediatrics', date: '2026-11-11', slot: '11:15 AM', type: 'Consultation', status: 'Checked In' },
    { id: 'APT-203', patient: 'Vikram Seth', doctor: 'Dr. Meenakshi', dept: 'Orthopedics', date: '2026-11-11', slot: '02:00 PM', type: 'Pre-Op', status: 'Scheduled' }
  ];

  return (
    <>
      <PageHeader
        title="Outpatient Appointments Management"
        subtitle="Schedule doctor slots, manage queues, and coordinate OPD sessions."
        roleBadge="Receptionist"
        action={
          <Button variant="contained" startIcon={<AddIcon />}>
            Book Appointment
          </Button>
        }
      />

      <Card>
        <CardContent sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Appointment Ref</TableCell>
                <TableCell>Patient</TableCell>
                <TableCell>Doctor & Department</TableCell>
                <TableCell>Date & Slot</TableCell>
                <TableCell>Visit Type</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {appointments.map((a) => (
                <TableRow key={a.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{a.id}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{a.patient}</TableCell>
                  <TableCell>{a.doctor} ({a.dept})</TableCell>
                  <TableCell>{a.date} at {a.slot}</TableCell>
                  <TableCell>{a.type}</TableCell>
                  <TableCell>
                    <Chip label={a.status} size="small" color="primary" />
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

export default AppointmentsPage;

