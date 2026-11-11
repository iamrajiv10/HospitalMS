import React from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Chip, Button } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PageHeader from '../../../components/common/PageHeader';

export const AdmissionsDischargesPage = () => {
  const admissions = [
    { id: 'ADM-501', patient: 'Ramesh Gupta', ward: 'ICU-B1', admittingDoctor: 'Dr. Arvind Kejriwal', admissionDate: '2026-11-08', status: 'Admitted' },
    { id: 'ADM-502', patient: 'Sunil Rao', ward: 'ICU-B2', admittingDoctor: 'Dr. Ramesh Sharma', admissionDate: '2026-11-09', status: 'Admitted' },
    { id: 'ADM-503', patient: 'Karan Mehra', ward: 'GEN-A3', admittingDoctor: 'Dr. Arvind Kejriwal', admissionDate: '2026-11-06', status: 'Discharge Approved' }
  ];

  return (
    <>
      <PageHeader
        title="Admissions & Discharge Processing"
        subtitle="Inpatient admission intake records, bed assignment, and physician discharge clearance."
        roleBadge="Ward Manager"
      />

      <Card>
        <CardContent sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Admission Ref</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Allocated Bed / Ward</TableCell>
                <TableCell>Admitting Consultant</TableCell>
                <TableCell>Admission Date</TableCell>
                <TableCell>Clearance Status</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {admissions.map((adm) => (
                <TableRow key={adm.id} hover>
                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{adm.id}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{adm.patient}</TableCell>
                  <TableCell>{adm.ward}</TableCell>
                  <TableCell>{adm.admittingDoctor}</TableCell>
                  <TableCell>{adm.admissionDate}</TableCell>
                  <TableCell>
                    <Chip
                      label={adm.status}
                      size="small"
                      color={adm.status === 'Discharge Approved' ? 'success' : 'primary'}
                    />
                  </TableCell>
                  <TableCell align="right">
                    {adm.status === 'Discharge Approved' ? (
                      <Button size="small" variant="contained" color="success" startIcon={<CheckCircleIcon />}>
                        Process Bed Release
                      </Button>
                    ) : (
                      <Button size="small" variant="outlined">
                        Transfer Bed
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

export default AdmissionsDischargesPage;

