import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { ThemeProvider, CssBaseline } from '@mui/material';
  import { createAppTheme } from '@blockhouse/shared-lib';
  import RevenuePage from './pages/RevenuePage';

  const theme = createAppTheme('light');

  const root = ReactDOM.createRoot(document.getElementById('root')!);
  root.render(
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <RevenuePage />
      </ThemeProvider>
    </React.StrictMode>
  );