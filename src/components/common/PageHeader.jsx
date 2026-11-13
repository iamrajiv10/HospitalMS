import React from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';

export const PageHeader = ({ title, subtitle, roleBadge, action }) => {
  return (
    <Box
      sx={{
        mb: 3,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2
      }}
    >
      <Box>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Typography variant="h5" component="h1" fontWeight={700}>
            {title}
          </Typography>
          {roleBadge && (
            <Chip
              label={roleBadge}
              size="small"
              color="primary"
              variant="outlined"
              sx={{ fontWeight: 600, fontSize: '0.75rem' }}
            />
          )}
        </Stack>
        {subtitle && (
          <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      {action && <Box>{action}</Box>}
    </Box>
  );
};

export default PageHeader;
