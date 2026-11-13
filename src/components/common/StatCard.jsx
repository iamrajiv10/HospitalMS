import React from 'react';
import { Card, CardContent, Typography, Box, Stack } from '@mui/material';

export const StatCard = ({ title, value, icon: Icon, color = 'primary.main', subtitle }) => {
  return (
    <Card sx={{ height: '100%', borderRadius: 2.5, boxShadow: '0 1px 3px rgba(0,0,0,0.08)', border: '1px solid #e2e8f0' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Box>
            <Typography variant="body2" color="text.secondary" fontWeight={500} gutterBottom>
              {title}
            </Typography>
            <Typography variant="h5" fontWeight={700} color="text.primary">
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          {Icon && (
            <Box
              sx={{
                p: 1.2,
                borderRadius: 2,
                backgroundColor: `${color}15`,
                color: color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Icon fontSize="medium" />
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default StatCard;
