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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid,
  Stack,
  IconButton,
  Tooltip,
  Alert
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

import PageHeader from '../common/PageHeader';
import { useAuth } from '../../context/AuthContext';
import { MOCK_USERS } from '../../services/mockData';
import { ROLES, ROLE_LABELS } from '../../config/roles';

export const StaffManagementPage = () => {
  const { authData } = useAuth();
  const [staffList, setStaffList] = useState(() =>
    MOCK_USERS.filter((u) => u.tenantId === authData?.hospital_id || u.role !== 'SUPER_ADMIN')
  );

  const [openDialog, setOpenDialog] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: ROLES.DOCTOR,
    department: 'General Medicine'
  });

  const handleOpen = () => setOpenDialog(true);
  const handleClose = () => setOpenDialog(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddStaff = (e) => {
    e.preventDefault();
    const newStaff = {
      id: `usr-${Date.now()}`,
      name: formData.name,
      email: formData.email,
      role: formData.role,
      tenantId: authData?.hospital_id,
      tenantName: authData?.hospital_name || 'Hospital',
      status: 'Active'
    };

    setStaffList([newStaff, ...staffList]);
    setSuccessMsg(`New staff member "${formData.name}" added with role ${formData.role}!`);
    setTimeout(() => setSuccessMsg(''), 4000);
    handleClose();
    setFormData({ name: '', email: '', role: ROLES.DOCTOR, department: 'General Medicine' });
  };

  const allowedRoles = [
    ROLES.RECEPTIONIST,
    ROLES.DOCTOR,
    ROLES.INVENTORY_MANAGER,
    ROLES.WARD_MANAGER
  ];

  return (
    <>
      <PageHeader
        title="Staff & Role Management"
        subtitle={`Provision and assign roles (Doctor, Receptionist, Inventory, Ward Manager) for ${authData?.hospital_name}.`}
        roleBadge="Hospital Admin"
        action={
          <Button variant="contained" startIcon={<PersonAddIcon />} onClick={handleOpen}>
            Add Staff Member
          </Button>
        }
      />

      {successMsg && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMsg}
        </Alert>
      )}

      <Card sx={{ borderRadius: 2.5, border: '1px solid #e2e8f0' }}>
        <CardContent sx={{ p: 0 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Staff Member</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Assigned Role</TableCell>
                <TableCell>Hospital</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {staffList.map((member) => (
                <TableRow key={member.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>
                    <Chip
                      label={ROLE_LABELS[member.role] || member.role}
                      size="small"
                      color="primary"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary' }}>{member.tenantName}</TableCell>
                  <TableCell>
                    <Chip label="Active" size="small" color="success" />
                  </TableCell>
                  <TableCell align="right">
                    <Stack direction="row" spacing={1} justifyContent="flex-end">
                      <Tooltip title="Edit Permissions">
                        <IconButton size="small">
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Revoke Access">
                        <IconButton size="small" color="error">
                          <DeleteOutlineIcon fontSize="small" />
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

      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Add New Hospital Personnel</DialogTitle>
        <form onSubmit={handleAddStaff}>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  label="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Dr. Priya Singh"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  required
                  type="email"
                  label="Official Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. priya@hospital.com"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  select
                  label="Select Role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  helperText="Assign responsibilities and role-based access."
                >
                  {allowedRoles.map((roleKey) => (
                    <MenuItem key={roleKey} value={roleKey}>
                      {ROLE_LABELS[roleKey]}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">Grant Access & Save</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default StaffManagementPage;

