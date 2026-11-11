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
  Grid,
  MenuItem
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PageHeader from '../../../components/common/PageHeader';
import { useNotification } from '../../../contexts/NotificationContext';

export const PatientRegistrationPage = () => {
  const { showNotification } = useNotification();
  const [patients, setPatients] = useState([
    { id: 'PAT-001', name: 'Rahul Verma', age: 34, gender: 'Male', contact: '+91 98765 43210', bloodGroup: 'O+', regDate: '2026-11-10' },
    { id: 'PAT-002', name: 'Anita Desai', age: 29, gender: 'Female', contact: '+91 98450 11223', bloodGroup: 'B+', regDate: '2026-11-10' },
    { id: 'PAT-003', name: 'Suresh Menon', age: 52, gender: 'Male', contact: '+91 97112 34455', bloodGroup: 'A+', regDate: '2026-11-09' }
  ]);

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Male',
    contact: '',
    bloodGroup: 'O+'
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newPat = {
      id: `PAT-00${patients.length + 1}`,
      name: formData.name,
      age: formData.age,
      gender: formData.gender,
      contact: formData.contact,
      bloodGroup: formData.bloodGroup,
      regDate: new Date().toISOString().split('T')[0]
    };
    setPatients([newPat, ...patients]);
    showNotification(`Patient ${formData.name} registered with ID ${newPat.id}!`, 'success');
    setOpen(false);
  };

  return (
    <>
      <PageHeader
        title="Patient Registration & Directory"
        subtitle="Intake new outpatients and inpatients into the hospital tenant registry."
        roleBadge="Receptionist"
        action={
          <Button variant="contained" startIcon={<PersonAddIcon />} onClick={() => setOpen(true)}>
            Register New Patient
          </Button>
        }
      />

      <Card>
        <CardContent sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Patient ID</TableCell>
                <TableCell>Full Name</TableCell>
                <TableCell>Age & Gender</TableCell>
                <TableCell>Blood Group</TableCell>
                <TableCell>Contact Number</TableCell>
                <TableCell>Registration Date</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {patients.map((pat) => (
                <TableRow key={pat.id} hover>
                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{pat.id}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{pat.name}</TableCell>
                  <TableCell>{pat.age} yrs / {pat.gender}</TableCell>
                  <TableCell>
                    <Chip label={pat.bloodGroup} size="small" variant="outlined" color="primary" />
                  </TableCell>
                  <TableCell>{pat.contact}</TableCell>
                  <TableCell>{pat.regDate}</TableCell>
                  <TableCell>
                    <Chip label="Active" size="small" color="success" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Registration Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>New Patient Intake</DialogTitle>
        <form onSubmit={handleRegister}>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth required label="Patient Full Name" name="name" value={formData.name} onChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth required type="number" label="Age" name="age" value={formData.age} onChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth select label="Gender" name="gender" value={formData.gender} onChange={handleChange}>
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth required label="Contact Phone" name="contact" value={formData.contact} onChange={handleChange} />
              </Grid>
              <Grid item xs={6}>
                <TextField fullWidth select label="Blood Group" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange}>
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                </TextField>
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions sx={{ p: 2 }}>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">Complete Registration</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};

export default PatientRegistrationPage;

