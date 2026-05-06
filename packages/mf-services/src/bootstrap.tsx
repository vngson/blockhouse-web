import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { ThemeProvider } from '@mui/material/styles';
  import { CssBaseline } from '@mui/material';
  import { lightTheme } from '@blockhouse/shared-lib/theme/theme';
  import ServicesRemote from './ServicesRemote';

  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={lightTheme}>
        <CssBaseline />
        <ServicesRemote />
      </ThemeProvider>
    </React.StrictMode>
  );