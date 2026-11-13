import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Button,
  Stack,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import AddIcon from '@mui/icons-material/Add';
import PageHeader from '../common/PageHeader';
import { MOCK_HOSPITALS } from '../../services/mockData';

export const HospitalDirectoryPage = () => {
  const [hospitals, setHospitals] = useState(MOCK_HOSPITALS);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    domain: '',
    tier: 'Pro',
    activeBeds: 150
  });

  const handleAdd = (e) => {
    e.preventDefault();
    const newHosp = {
      id: `hosp-${Date.now()}`,
      name: formData.name,
      code: formData.code.toUpperCase(),
      domain: `${formData.code.toLowerCase()}.curacloud.health`,
      tier: formData.tier,
      status: 'ACTIVE',
      activeBeds: Number(formData.activeBeds),
      activeStaff: 25
    };
    setHospitals([...hospitals, newHosp]);
    setOpen(false);
    setFormData({ name: '', code: '', domain: '', tier: 'Pro', activeBeds: 150 });
  };

  return (
    <>
      <PageHeader
        title="Hospital Tenants Directory"
        subtitle="Manage subscribed hospital institutions, configure isolation tiers, and track resource limits."
        roleBadge="Super Admin"
        action={
          <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpen(true)}>
            Onboard Hospital
          </Button>
        }
      />

      <Card sx={{ borderRadius: 2.5, border: '1px solid #e2e8f0' }}>
        <CardContent sx={{ p: 0 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Tenant ID</TableCell>
                <TableCell>Hospital Name</TableCell>
                <TableCell>Subdomain</TableCell>
                <TableCell>Capacity (Beds)</TableCell>
                <TableCell>Staff Count</TableCell>
                <TableCell>Tier</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hospitals.map((hospital) => (
                <TableRow key={hospital.id} hover>
                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{hospital.id}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{hospital.name}</TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{hospital.domain}</TableCell>
                  <TableCell>{hospital.activeBeds} Beds</TableCell>
                  <TableCell>{hospital.activeStaff} Staff</TableCell>
                  <TableCell>
                    <Chip label={hospital.tier} size="small" color="primary" variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip label={hospital.status} size="small" color="success" />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Tooltip title="Configure Tenant">
                        <IconButton size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Suspend Tenant">
                        <IconButton size="small" color="error">
                          <BlockIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Onboard New Hospital Tenant</DialogTitle>
        <form onSubmit={handleAdd}>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Hospital Legal Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Metro Life Hospital"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  required
                  label="Hospital Code"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="METRO-01"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  select
                  label="Subscription Tier"
                  value={formData.tier}
                  onChange={(e) => setFormData({ ...formData, tier: e.target.value })}
                >
                  <MenuItem value="Starter">Starter (Up to 50 beds)</MenuItem>
                  <MenuItem value="Pro">Pro (Up to 300 beds)</MenuItem>
                  <MenuItem value="Enterprise">Enterprise (Unlimited)</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  type="number"
                  label="Initial Bed Capacity"
                  value={formData.activeBeds}
                  onChange={(e) => setFormData({ ...formData, activeBeds: e.target.value })}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Deploy Tenant</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default HospitalDirectoryPage;

