import React from 'react';
import { Box, Container } from '@mui/material';

export const MainSection = ({ activeComponent: ActiveComponent, onNavigate }) => {
  return (
    <Box
      component="main"
      sx={{
        width: { xs: '100%', md: '90%' },
        flexGrow: 1,
        p: { xs: 2, sm: 3, md: 3.5 },
        bgcolor: '#f8fafc',
        minHeight: { md: 'calc(100vh - 64px - 50px)' },
        overflowY: 'auto'
      }}
    >
      <Container maxWidth="xl" disableGutters>
        {ActiveComponent ? (
          <ActiveComponent onNavigate={onNavigate} />
        ) : (
          <div>Please select a section from the sidebar.</div>
        )}
      </Container>
    </Box>
  );
};

export default MainSection;

