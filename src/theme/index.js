import { createTheme } from '@mui/material/styles';

export const createAppTheme = (mode = 'light') => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: '#0284c7', // Medical sky/cyan blue
        light: '#38bdf8',
        dark: '#0369a1',
        contrastText: '#ffffff'
      },
      secondary: {
        main: '#0d9488', // Teal accent
        light: '#2dd4bf',
        dark: '#0f766e',
        contrastText: '#ffffff'
      },
      success: {
        main: '#10b981',
        light: '#34d399',
        dark: '#059669'
      },
      warning: {
        main: '#f59e0b',
        light: '#fbbf24',
        dark: '#d97706'
      },
      error: {
        main: '#ef4444',
        light: '#f87171',
        dark: '#dc2626'
      },
      background: {
        default: '#f8fafc',
        paper: '#ffffff'
      },
      text: {
        primary: '#0f172a',
        secondary: '#64748b'
      },
      divider: '#e2e8f0'
    },
    typography: {
      fontFamily: ['"Roboto"', '"Helvetica"', '"Arial"', 'sans-serif'].join(','),
      h5: {
        fontWeight: 600,
        color: '#0f172a'
      },
      h6: {
        fontWeight: 600,
        color: '#0f172a'
      },
      subtitle1: {
        fontWeight: 500
      },
      button: {
        textTransform: 'none',
        fontWeight: 600
      }
    },
    shape: {
      borderRadius: 10
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true
        },
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: '8px 16px'
          }
        }
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            border: '1px solid #e2e8f0'
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none'
          }
        }
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: '#f1f5f9',
            fontWeight: 600,
            color: '#334155'
          }
        }
      }
    }
  });
};

