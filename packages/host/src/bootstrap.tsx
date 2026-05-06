import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline, LinearProgress, Box } from '@mui/material';
import { createAppTheme, loadingEvents } from '@blockhouse/shared-lib';
import { useThemeStore } from './stores/themeStore';
import logoDark from '@blockhouse/shared-lib/assets/blockhouse_logo_transparent_white.png';
import logoLight from '@blockhouse/shared-lib/assets/blockhouse_logo_transparent.png';
import App from './app/App';

function useBrowserFavicon() {
  React.useEffect(() => {
    const link = document.querySelector<HTMLLinkElement>("link[rel*='icon']")!;
    const mql = window.matchMedia('(prefers-color-scheme: dark)');

    const update = () => {
      link.href = mql.matches ? logoDark : logoLight;
    };
    update();
    mql.addEventListener('change', update);
    return () => mql.removeEventListener('change', update);
  }, []);
}

function useLoadingState() {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const unsubscribe = loadingEvents.on(setLoading);
    return unsubscribe;
  }, []);

  return loading;
}

function GlobalLoadingBar() {
  const loading = useLoadingState();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        height: 3,
        visibility: loading ? 'visible' : 'hidden',
        opacity: loading ? 1 : 0,
        transition: 'opacity 0.2s',
      }}
    >
      <LinearProgress
        sx={{
          height: 3,
          borderRadius: 0,
          '& .MuiLinearProgress-bar': {
            transition: 'none',
          },
        }}
      />
    </Box>
  );
}

function ThemedApp() {
  const mode = useThemeStore((state) => state.mode);
  const theme = React.useMemo(() => createAppTheme(mode), [mode]);
  useBrowserFavicon();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalLoadingBar />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <ThemedApp />
  </React.StrictMode>
);
