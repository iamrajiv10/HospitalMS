import React, { useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createAppTheme } from './theme';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './layout/Layout';
import Login from './Login';

// Inner shell handling authentication state
const AppContent = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Layout /> : <Login />;
};

function App() {
  const theme = useMemo(() => createAppTheme('light'), []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
