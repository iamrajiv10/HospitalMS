import React from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Chip, Button } from '@mui/material';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PageHeader from '../../../components/common/PageHeader';

export const ConsultationsPage = () => {
  const consultations = [
    { id: 'CNS-01', patient: 'Rahul Verma', time: '10:00 AM', mode: 'In-Person OPD', room: 'Consultation Room 3B', status: 'Completed' },
    { id: 'CNS-02', patient: 'Suresh Menon', time: '11:30 AM', mode: 'In-Person OPD', room: 'Consultation Room 3B', status: 'Ongoing' },
    { id: 'CNS-03', patient: 'Deepa Rao', time: '03:00 PM', mode: 'Telehealth Video', room: 'Virtual Room A', status: 'Scheduled' }
  ];

  return (
    <>
      <PageHeader
        title="Consultation Schedule & Telehealth"
        subtitle="Daily OPD calendar, telehealth virtual rooms, and clinical follow-ups."
        roleBadge="Doctor"
      />

      <Card>
        <CardContent sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Session ID</TableCell>
                <TableCell>Patient</TableCell>
                <TableCell>Time Slot</TableCell>
                <TableCell>Consultation Mode</TableCell>
                <TableCell>Room / Channel</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {consultations.map((c) => (
                <TableRow key={c.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{c.id}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{c.patient}</TableCell>
                  <TableCell>{c.time}</TableCell>
                  <TableCell>
                    <Chip
                      label={c.mode}
                      size="small"
                      variant="outlined"
                      color={c.mode.includes('Video') ? 'secondary' : 'default'}
                    />
                  </TableCell>
                  <TableCell>{c.room}</TableCell>
                  <TableCell>
                    <Chip label={c.status} size="small" color={c.status === 'Ongoing' ? 'warning' : c.status === 'Completed' ? 'success' : 'default'} />
                  </TableCell>
                  <TableCell align="right">
                    {c.mode.includes('Video') ? (
                      <Button size="small" variant="contained" color="secondary" startIcon={<VideoCallIcon />}>
                        Join Call
                      </Button>
                    ) : (
                      <Button size="small" variant="outlined">
                        Open Notes
                      </Button>
                    )}
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

export default ConsultationsPage;

