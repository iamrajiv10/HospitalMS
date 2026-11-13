import React from 'react';
import { Grid, Typography, Card, CardContent, Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, Chip } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import PostAddIcon from '@mui/icons-material/PostAdd';

import PageHeader from '../common/PageHeader';
import StatCard from '../common/StatCard';

export const InventoryDashboard = ({ onNavigate }) => {
  const stockAlerts = [
    { code: 'MED-104', name: 'Amoxicillin 500mg', current: 40, threshold: 100, unit: 'Strips', status: 'Low Stock' },
    { code: 'MED-219', name: 'Normal Saline (IV 500ml)', current: 15, threshold: 50, unit: 'Bottles', status: 'Critical' },
    { code: 'MED-088', name: 'Paracetamol IV 100ml', current: 25, threshold: 60, unit: 'Vials', status: 'Low Stock' }
  ];

  return (
    <>
      <PageHeader
        title="Pharmacy & Inventory Hub"
        subtitle="Real-time pharmaceutical inventory, batch expiry monitoring, and supplier purchase orders."
        roleBadge="Inventory Manager"
        action={
          <Button
            variant="contained"
            startIcon={<PostAddIcon />}
            onClick={() => onNavigate && onNavigate('medicines')}
          >
            Add Drug / Stock In
          </Button>
        }
      />

      <Grid container spacing={2.5} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Catalog Items"
            value="1,240"
            icon={InventoryIcon}
            color="#0284c7"
            subtitle="Medicines & Consumables"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Low Stock Alerts"
            value="7"
            icon={WarningAmberIcon}
            color="#ef4444"
            subtitle="Requires immediate reorder"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Suppliers"
            value="18"
            icon={LocalShippingIcon}
            color="#10b981"
            subtitle="Verified pharma vendors"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Open Purchase Orders"
            value="4"
            icon={AddShoppingCartIcon}
            color="#8b5cf6"
            subtitle="Expected arrival this week"
          />
        </Grid>
      </Grid>

      <Card sx={{ borderRadius: 2.5, border: '1px solid #e2e8f0' }}>
        <CardContent>
          <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
            <Typography variant="h6" fontWeight={700}>
              Critical Stock Depletion Alerts
            </Typography>
            <Button size="small" onClick={() => onNavigate && onNavigate('medicines')}>
              View Full Pharmacy Stock
            </Button>
          </Stack>

          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Drug SKU</TableCell>
                <TableCell>Medicine Name</TableCell>
                <TableCell>Current Balance</TableCell>
                <TableCell>Reorder Point</TableCell>
                <TableCell>Packaging Unit</TableCell>
                <TableCell>Alert Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stockAlerts.map((item) => (
                <TableRow key={item.code} hover>
                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{item.code}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{item.name}</TableCell>
                  <TableCell sx={{ fontWeight: 700, color: 'error.main' }}>{item.current}</TableCell>
                  <TableCell>{item.threshold}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell>
                    <Chip
                      label={item.status}
                      size="small"
                      color={item.status === 'Critical' ? 'error' : 'warning'}
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

export default InventoryDashboard;

