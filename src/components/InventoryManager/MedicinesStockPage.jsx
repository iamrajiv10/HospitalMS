import React from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Chip, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from '../common/PageHeader';

export const MedicinesStockPage = () => {
  const medicines = [
    { sku: 'MED-101', name: 'Telmisartan 40mg', category: 'Cardiovascular', stock: 450, unitPrice: '$0.35', batch: 'BAT-2024-X1', expiry: '2027-08-30' },
    { sku: 'MED-102', name: 'Atorvastatin 20mg', category: 'Lipid-lowering', stock: 620, unitPrice: '$0.50', batch: 'BAT-2024-Y4', expiry: '2027-10-15' },
    { sku: 'MED-103', name: 'Amoxicillin 500mg', category: 'Antibiotic', stock: 40, unitPrice: '$0.75', batch: 'BAT-2023-A9', expiry: '2026-12-01' },
    { sku: 'MED-104', name: 'Paracetamol 650mg', category: 'Analgesic', stock: 1200, unitPrice: '$0.10', batch: 'BAT-2024-Z2', expiry: '2028-01-20' },
    { sku: 'MED-105', name: 'Insulin Glargine 100IU', category: 'Antidiabetic', stock: 95, unitPrice: '$18.00', batch: 'BAT-2024-INS', expiry: '2026-06-30' }
  ];

  return (
    <>
      <PageHeader
        title="Medicines & Pharmaceutical Inventory"
        subtitle="Manage hospital pharmacy inventory, drug batches, expiration warnings, and stock levels."
        roleBadge="Inventory Manager"
        action={
          <Button variant="contained" startIcon={<AddIcon />}>
            New Drug Entry
          </Button>
        }
      />

      <Card sx={{ borderRadius: 2.5, border: '1px solid #e2e8f0' }}>
        <CardContent sx={{ p: 0 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>SKU Code</TableCell>
                <TableCell>Medicine Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Stock On Hand</TableCell>
                <TableCell>Unit Cost</TableCell>
                <TableCell>Batch #</TableCell>
                <TableCell>Expiry Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {medicines.map((med) => (
                <TableRow key={med.sku} hover>
                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{med.sku}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{med.name}</TableCell>
                  <TableCell>{med.category}</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: med.stock < 100 ? 'error.main' : 'text.primary' }}>
                    {med.stock} {med.stock < 100 ? '(Low)' : ''}
                  </TableCell>
                  <TableCell>{med.unitPrice}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{med.batch}</TableCell>
                  <TableCell>{med.expiry}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default MedicinesStockPage;

