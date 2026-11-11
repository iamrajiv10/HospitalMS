import React, { useState } from 'react';
import { Grid, Card, CardContent, Typography, Box, Chip, Button, Stack, Tabs, Tab } from '@mui/material';
import HotelIcon from '@mui/icons-material/Hotel';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import PageHeader from '../../../components/common/PageHeader';
import { useNotification } from '../../../contexts/NotificationContext';

export const BedAllocationPage = () => {
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState(0);

  const [beds, setBeds] = useState([
    { id: 'ICU-B1', ward: 'ICU', patient: 'Ramesh Gupta', status: 'Occupied', admittedAt: '2026-11-08' },
    { id: 'ICU-B2', ward: 'ICU', patient: 'Sunil Rao', status: 'Occupied', admittedAt: '2026-11-09' },
    { id: 'ICU-B3', ward: 'ICU', patient: null, status: 'Available', admittedAt: null },
    { id: 'ICU-B4', ward: 'ICU', patient: 'Anita Joshi', status: 'Occupied', admittedAt: '2026-11-10' },
    { id: 'GEN-A1', ward: 'General', patient: 'Mohan Lal', status: 'Occupied', admittedAt: '2026-11-07' },
    { id: 'GEN-A2', ward: 'General', patient: null, status: 'Available', admittedAt: null },
    { id: 'GEN-A3', ward: 'General', patient: null, status: 'Available', admittedAt: null },
    { id: 'GEN-A4', ward: 'General', patient: 'Deepak Shah', status: 'Occupied', admittedAt: '2026-11-10' }
  ]);

  const handleBedAction = (bed) => {
    if (bed.status === 'Available') {
      showNotification(`Bed ${bed.id} ready for patient admission intake.`, 'info');
    } else {
      showNotification(`Bed ${bed.id} occupied by ${bed.patient}.`, 'warning');
    }
  };

  const filteredBeds = activeTab === 0 ? beds : activeTab === 1 ? beds.filter(b => b.ward === 'ICU') : beds.filter(b => b.ward === 'General');

  return (
    <>
      <PageHeader
        title="Live Bed Matrix & Allocation"
        subtitle="Visual grid of inpatient beds, occupancy statuses, and immediate bed assignment."
        roleBadge="Ward Manager"
      />

      <Box sx={{ mb: 3 }}>
        <Tabs value={activeTab} onChange={(e, val) => setActiveTab(val)}>
          <Tab label="All Wards (8)" />
          <Tab label="ICU Ward (4)" />
          <Tab label="General Ward (4)" />
        </Tabs>
      </Box>

      <Grid container spacing={2.5}>
        {filteredBeds.map((bed) => {
          const isOccupied = bed.status === 'Occupied';
          return (
            <Grid item xs={12} sm={6} md={3} key={bed.id}>
              <Card
                sx={{
                  border: isOccupied ? '1px solid #fed7aa' : '1px solid #bbf7d0',
                  bgcolor: isOccupied ? '#fffaf0' : '#f0fdf4',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': { transform: 'translateY(-2px)', boxShadow: 2 }
                }}
                onClick={() => handleBedAction(bed)}
              >
                <CardContent>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 1.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <HotelIcon color={isOccupied ? 'warning' : 'success'} />
                      <Typography variant="h6" fontWeight={700}>
                        {bed.id}
                      </Typography>
                    </Box>
                    <Chip
                      label={bed.status}
                      size="small"
                      color={isOccupied ? 'warning' : 'success'}
                      sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                    />
                  </Stack>

                  <Typography variant="caption" color="text.secondary" display="block">
                    Ward: <b>{bed.ward}</b>
                  </Typography>

                  <Typography variant="body2" sx={{ mt: 1, fontWeight: isOccupied ? 600 : 400, color: isOccupied ? 'text.primary' : 'text.secondary' }}>
                    {isOccupied ? `Patient: ${bed.patient}` : 'Ready for Admission'}
                  </Typography>

                  {bed.admittedAt && (
                    <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                      Admitted: {bed.admittedAt}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

export default BedAllocationPage;

