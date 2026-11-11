import React from 'react';
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
  Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import BlockIcon from '@mui/icons-material/Block';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../../components/common/PageHeader';
import { MOCK_HOSPITALS } from '../../../services/mockData';

export const HospitalDirectoryPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title="Hospital Tenants Directory"
        subtitle="Manage subscribed hospital institutions, configure isolation tiers, and track resource limits."
        roleBadge="Super Admin"
        action={
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/super-admin/hospitals/new')}
          >
            Provision Hospital
          </Button>
        }
      />

      <Card>
        <CardContent sx={{ p: 0 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Hospital Identifier</TableCell>
                <TableCell>Hospital Name</TableCell>
                <TableCell>Subdomain</TableCell>
                <TableCell>Capacity (Beds)</TableCell>
                <TableCell>Active Staff</TableCell>
                <TableCell>Plan Tier</TableCell>
                <TableCell>Tenant Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {MOCK_HOSPITALS.map((hospital) => (
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
                      <Tooltip title="Configure Tenant Limits">
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
    </>
  );
};

export default HospitalDirectoryPage;

