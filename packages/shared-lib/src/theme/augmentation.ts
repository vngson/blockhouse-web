import '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    sidebar: {
      background: string;
      gradient: string;
      textPrimary: string;
      textSecondary: string;
      textMuted: string;
      activeBg: string;
      activeColor: string;
      activeBar: string;
      divider: string;
      hoverBg: string;
      logoBg: string;
      avatarBg: string;
      avatarColor: string;
    };
    header: {
      background: string;
      border: string;
    };
  }

  interface ThemeOptions {
    sidebar?: Theme['sidebar'];
    header?: Theme['header'];
  }
}
