import React from 'react';
  import { AppBar, Toolbar, Typography, IconButton, Box, alpha } from '@mui/material';
  import { useTheme } from '@mui/material/styles';
  import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
  import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
  import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';
  import { useThemeStore } from '../../stores/themeStore';

  interface HeaderProps {
    onToggleSidebar: () => void;
    isMobile?: boolean;
  }

  export default function Header({ onToggleSidebar, isMobile }: HeaderProps) {
    const theme = useTheme();
    const { mode, toggleTheme } = useThemeStore();

    return (
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: theme.header.background,
          backdropFilter: 'blur(12px)',
          borderBottom: theme.header.border,
        }}
      >
        <Toolbar sx={{ gap: 1 }}>
          {!isMobile && (
            <IconButton
              onClick={onToggleSidebar}
              sx={{
                borderRadius: '10px',
                bgcolor: alpha(theme.palette.primary.main, 0.06),
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.12) },
                transition: 'background 0.2s',
              }}
            >
              <MenuRoundedIcon sx={{ color: 'text.secondary' }} />
            </IconButton>
          )}
          <Typography
            variant="subtitle1"
            fontWeight={600}
            sx={{ color: 'text.primary', letterSpacing: 0.2 }}
          >
            Quản lý tiệm Barber
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <IconButton
            onClick={toggleTheme}
            sx={{
              borderRadius: '10px',
              bgcolor: alpha(theme.palette.primary.main, 0.06),
              '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.12) },
              transition: 'all 0.3s',
            }}
          >
            {mode === 'dark' ? (
              <LightModeRoundedIcon sx={{ color: '#ffa726', fontSize: '1.2rem' }} />
            ) : (
              <DarkModeRoundedIcon sx={{ color: theme.palette.primary.main, fontSize: '1.2rem' }} />
            )}
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
