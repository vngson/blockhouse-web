import { createTheme } from '@mui/material/styles';
import { getPalette } from './palette';
import { typography } from './typography';
import './augmentation';

export function createAppTheme(mode: 'light' | 'dark') {
  const palette = getPalette(mode);

  return createTheme({
    palette: { ...palette, mode },
    typography,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            boxShadow:
              mode === 'light'
                ? '0 2px 8px rgba(0,0,0,0.1)'
                : '0 2px 8px rgba(0,0,0,0.3)',
          },
        },
      },
    },
    sidebar:
      mode === 'light'
        ? {
            background: '#ffffff',
            gradient: 'linear-gradient(180deg, #ffffff 0%, #f8f9fb 100%)',
            textPrimary: '#1a1a2e',
            textSecondary: 'rgba(0,0,0,0.55)',
            textMuted: 'rgba(0,0,0,0.35)',
            activeBg: 'rgba(25,118,210,0.08)',
            activeColor: '#1976d2',
            activeBar: 'linear-gradient(180deg, #42a5f5, #1976d2)',
            divider: 'rgba(0,0,0,0.08)',
            hoverBg: 'rgba(0,0,0,0.04)',
            logoBg: 'rgba(25,118,210,0.06)',
            avatarBg: 'rgba(25,118,210,0.1)',
            avatarColor: '#1976d2',
          }
        : {
            background: '#1b2838',
            gradient: 'linear-gradient(180deg, #0d1b2a 0%, #1b2838 50%, #0d1b2a 100%)',
            textPrimary: '#ffffff',
            textSecondary: 'rgba(255,255,255,0.55)',
            textMuted: 'rgba(255,255,255,0.28)',
            activeBg: 'rgba(66,165,245,0.12)',
            activeColor: '#90caf9',
            activeBar: 'linear-gradient(180deg, #42a5f5, #1976d2)',
            divider: 'rgba(255,255,255,0.06)',
            hoverBg: 'rgba(255,255,255,0.04)',
            logoBg: 'rgba(255,255,255,0.08)',
            avatarBg: 'rgba(66,165,245,0.2)',
            avatarColor: '#90caf9',
          },
    header:
      mode === 'light'
        ? {
            background: 'rgba(255,255,255,0.85)',
            border: '1px solid rgba(0,0,0,0.06)',
          }
        : {
            background: 'rgba(27,40,56,0.85)',
            border: '1px solid rgba(255,255,255,0.06)',
          },
  });
}

export const lightTheme = createAppTheme('light');
export const darkTheme = createAppTheme('dark');
