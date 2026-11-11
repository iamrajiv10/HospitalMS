import React from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Chip, Button, Stack } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PageHeader from '../../../components/common/PageHeader';

export const PatientRecordsPage = () => {
  const records = [
    { id: 'REC-301', patient: 'Rahul Verma', lastVisit: '2026-11-10', primaryDiagnosis: 'Stage 1 Essential Hypertension', allergies: 'Penicillin', bloodGroup: 'O+' },
    { id: 'REC-302', patient: 'Anita Desai', lastVisit: '2026-11-08', primaryDiagnosis: 'Acute Bronchitis', allergies: 'None known', bloodGroup: 'B+' },
    { id: 'REC-303', patient: 'Suresh Menon', lastVisit: '2026-11-05', primaryDiagnosis: 'Coronary Artery Disease (CAD)', allergies: 'Sulfa Drugs', bloodGroup: 'A+' }
  ];

  return (
    <>
      <PageHeader
        title="Electronic Medical Records (EMR)"
        subtitle="Confidential clinical charts, diagnostic history, vital signs trend, and medical allergies."
        roleBadge="Doctor"
      />

      <Card>
        <CardContent sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Medical Record #</TableCell>
                <TableCell>Patient Name</TableCell>
                <TableCell>Primary Diagnosis</TableCell>
                <TableCell>Known Allergies</TableCell>
                <TableCell>Blood Group</TableCell>
                <TableCell>Last Clinical Visit</TableCell>
                <TableCell align="right">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {records.map((r) => (
                <TableRow key={r.id} hover>
                  <TableCell sx={{ fontFamily: 'monospace', fontWeight: 600 }}>{r.id}</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>{r.patient}</TableCell>
                  <TableCell>{r.primaryDiagnosis}</TableCell>
                  <TableCell>
                    {r.allergies === 'None known' ? (
                      <Chip label="None" size="small" variant="outlined" />
                    ) : (
                      <Chip label={r.allergies} size="small" color="error" variant="outlined" />
                    )}
                  </TableCell>
                  <TableCell>{r.bloodGroup}</TableCell>
                  <TableCell>{r.lastVisit}</TableCell>
                  <TableCell align="right">
                    <Button size="small" variant="outlined" startIcon={<VisibilityIcon />}>
                      View EMR Chart
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

export default PatientRecordsPage;

