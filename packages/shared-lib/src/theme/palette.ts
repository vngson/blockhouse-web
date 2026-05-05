import { PaletteOptions } from '@mui/material/styles';

const lightPalette: PaletteOptions = {
  primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
  },
  secondary: {
    main: '#9c27b0',
    light: '#ba68c8',
    dark: '#7b1fa2',
  },
  success: {
    main: '#2e7d32',
    light: '#4caf50',
  },
  error: {
    main: '#d32f2f',
    light: '#ef5350',
  },
  warning: {
    main: '#ed6c02',
    light: '#ff9800',
  },
  background: {
    default: '#f5f5f5',
    paper: '#ffffff',
  },
};

const darkPalette: PaletteOptions = {
  primary: {
    main: '#42a5f5',
    light: '#90caf9',
    dark: '#1976d2',
  },
  secondary: {
    main: '#ce93d8',
    light: '#f48fb1',
    dark: '#ab47bc',
  },
  success: {
    main: '#66bb6a',
    light: '#81c784',
  },
  error: {
    main: '#ef5350',
    light: '#e57373',
  },
  warning: {
    main: '#ffa726',
    light: '#ffb74d',
  },
  background: {
    default: '#0d1b2a',
    paper: '#1b2838',
  },
};

export function getPalette(mode: 'light' | 'dark'): PaletteOptions {
  return mode === 'light' ? lightPalette : darkPalette;
}
