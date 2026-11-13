import React from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Chip, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from '../common/PageHeader';

export const BillingPage = () => {
  const invoices = [
    { id: 'INV-8001', patient: 'Rahul Verma', service: 'Cardiology Consultation + ECG', amount: '$150.00', status: 'Paid', date: '2026-11-10' },
    { id: 'INV-8002', patient: 'Anita Desai', service: 'Pediatric Checkup + Vaccine', amount: '$95.00', status: 'Paid', date: '2026-11-10' },
    { id: 'INV-8003', patient: 'Suresh Menon', service: 'Inpatient Day Charge & Labs', amount: '$640.00', status: 'Pending', date: '2026-11-11' }
  ];

  return (
    <>
      <PageHeader
        title="Patient Billing & Cashier Desk"
        subtitle="Generate itemized invoices, manage insurance claims, and process payments."
        roleBadge="Receptionist"
        action={
          <Button variant="contained" startIcon={<AddIcon />}>
            Create New Invoice
          </Button>
        }
      />

      <Card sx={{ borderRadius: 2.5, border: '1px solid #e2e8f0' }}>
        <CardContent sx={{ p: 0 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Invoice #</TableCell>
                <TableCell>Patient</TableCell>
                <TableCell>Service Rendered</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Payment Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoices.map((inv) => (
                <TableRow key={inv.id} hover>
                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{inv.id}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{inv.patient}</TableCell>
                  <TableCell>{inv.service}</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>{inv.amount}</TableCell>
                  <TableCell>{inv.date}</TableCell>
                  <TableCell>
                    <Chip
                      label={inv.status}
                      size="small"
                      color={inv.status === 'Paid' ? 'success' : 'warning'}
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

export default BillingPage;

