import React from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Chip, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PrintIcon from '@mui/icons-material/Print';
import PageHeader from '../common/PageHeader';

export const PrescriptionsPage = () => {
  const prescriptions = [
    { id: 'RX-901', patient: 'Rahul Verma', medicines: 'Telmisartan 40mg (OD), Amlodipine 5mg (OD)', duration: '30 Days', date: '2026-11-10', status: 'Dispensed' },
    { id: 'RX-902', patient: 'Anita Desai', medicines: 'Amoxicillin 500mg (TDS), Paracetamol 650mg', duration: '5 Days', date: '2026-11-08', status: 'Dispensed' },
    { id: 'RX-903', patient: 'Suresh Menon', medicines: 'Atorvastatin 20mg (HS), Aspirin 75mg (OD)', duration: '60 Days', date: '2026-11-05', status: 'Active' }
  ];

  return (
    <>
      <PageHeader
        title="Digital Prescriptions & Rx Desk"
        subtitle="Issue verified e-prescriptions, set dosage regimens, and synchronize with the in-house pharmacy."
        roleBadge="Doctor"
        action={
          <Button variant="contained" startIcon={<AddIcon />}>
            Write Digital Rx
          </Button>
        }
      />

      <Card sx={{ borderRadius: 2.5, border: '1px solid #e2e8f0' }}>
        <CardContent sx={{ p: 0 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Rx Ref #</TableCell>
                <TableCell>Patient</TableCell>
                <TableCell>Prescribed Medicines & Dosage</TableCell>
                <TableCell>Duration</TableCell>
                <TableCell>Date Issued</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {prescriptions.map((p) => (
                <TableRow key={p.id} hover>
                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{p.id}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{p.patient}</TableCell>
                  <TableCell>{p.medicines}</TableCell>
                  <TableCell>{p.duration}</TableCell>
                  <TableCell>{p.date}</TableCell>
                  <TableCell>
                    <Chip label={p.status} size="small" color={p.status === 'Dispensed' ? 'success' : 'primary'} />
                  </TableCell>
                  <TableCell align="right">
                    <Button size="small" startIcon={<PrintIcon />}>
                      Print Rx
                    </Button>
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

export default PrescriptionsPage;

