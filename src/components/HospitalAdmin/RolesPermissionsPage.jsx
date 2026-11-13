import React from 'react';
import { Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow, Chip, Box } from '@mui/material';
import PageHeader from '../common/PageHeader';
import { ROLE_PERMISSIONS, ROLE_LABELS, ROLES } from '../../config/roles';

export const RolesPermissionsPage = () => {
  const hospitalRoles = [
    ROLES.HOSPITAL_ADMIN,
    ROLES.RECEPTIONIST,
    ROLES.DOCTOR,
    ROLES.INVENTORY_MANAGER,
    ROLES.WARD_MANAGER
  ];

  return (
    <>
      <PageHeader
        title="Role-Based Access Control (RBAC) Matrix"
        subtitle="Permissions defined for each departmental role within this hospital tenant."
        roleBadge="Hospital Admin"
      />

      <Card sx={{ borderRadius: 2.5, border: '1px solid #e2e8f0' }}>
        <CardContent sx={{ p: 0 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Role</TableCell>
                <TableCell>Key Responsibilities</TableCell>
                <TableCell>Active Permission Scopes</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {hospitalRoles.map((roleKey) => {
                const perms = ROLE_PERMISSIONS[roleKey] || [];
                return (
                  <TableRow key={roleKey} hover>
                    <TableCell sx={{ fontWeight: 700, width: '200px' }}>
                      {ROLE_LABELS[roleKey]}
                    </TableCell>
                    <TableCell sx={{ color: 'text.secondary', width: '260px' }}>
                      {roleKey === ROLES.HOSPITAL_ADMIN && 'Manage staff, roles, hospital configuration & reports'}
                      {roleKey === ROLES.RECEPTIONIST && 'Patient registration, appointment scheduling, billing & invoices'}
                      {roleKey === ROLES.DOCTOR && 'Patient clinical records, diagnoses, digital prescriptions'}
                      {roleKey === ROLES.INVENTORY_MANAGER && 'Pharmaceutical stock, medicines catalog, vendor suppliers'}
                      {roleKey === ROLES.WARD_MANAGER && 'Bed allocations, ward admissions, discharge management'}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {perms.map((p) => (
                          <Chip key={p} label={p} size="small" variant="outlined" color="primary" sx={{ fontSize: '0.68rem' }} />
                        ))}
                      </Box>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default RolesPermissionsPage;

