import React from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Chip, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from '../common/PageHeader';

export const SuppliersPage = () => {
  const suppliers = [
    { id: 'SUP-01', name: 'Apex Pharma Distributors', contactPerson: 'Sanjay Gupta', phone: '+91 99887 76655', suppliedCategory: 'Antibiotics & Injections', rating: '4.9 / 5', status: 'Active' },
    { id: 'SUP-02', name: 'MediLife Surgicals Ltd', contactPerson: 'Anita Roy', phone: '+91 98112 23344', suppliedCategory: 'IV Fluids, Cannulas, Syringes', rating: '4.7 / 5', status: 'Active' },
    { id: 'SUP-03', name: 'CardioCare Supplies', contactPerson: 'Deepak Patel', phone: '+91 97223 34455', suppliedCategory: 'Cardiac Stents & Devices', rating: '5.0 / 5', status: 'Active' }
  ];

  return (
    <>
      <PageHeader
        title="Suppliers & Pharmaceutical Vendors"
        subtitle="Manage approved vendor credentials, procurement contracts, and supplier delivery logs."
        roleBadge="Inventory Manager"
        action={
          <Button variant="contained" startIcon={<AddIcon />}>
            Add New Supplier
          </Button>
        }
      />

      <Card sx={{ borderRadius: 2.5, border: '1px solid #e2e8f0' }}>
        <CardContent sx={{ p: 0 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Vendor Ref</TableCell>
                <TableCell>Company Name</TableCell>
                <TableCell>Representative</TableCell>
                <TableCell>Contact Line</TableCell>
                <TableCell>Supplied Category</TableCell>
                <TableCell>Rating</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {suppliers.map((s) => (
                <TableRow key={s.id} hover>
                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{s.id}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{s.name}</TableCell>
                  <TableCell>{s.contactPerson}</TableCell>
                  <TableCell>{s.phone}</TableCell>
                  <TableCell>{s.suppliedCategory}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: 'success.main' }}>{s.rating}</TableCell>
                  <TableCell>
                    <Chip label={s.status} size="small" color="success" />
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

export default SuppliersPage;

