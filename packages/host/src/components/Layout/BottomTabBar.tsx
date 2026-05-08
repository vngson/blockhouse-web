import React from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, Box, alpha } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useLocation, useNavigate } from 'react-router-dom';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PeopleAltRoundedIcon from '@mui/icons-material/PeopleAltRounded';
import MonetizationOnRoundedIcon from '@mui/icons-material/MonetizationOnRounded';
import ContentCutRoundedIcon from '@mui/icons-material/ContentCutRounded';

const MENU_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: <DashboardRoundedIcon /> },
  { label: 'Nhân viên', path: '/employees', icon: <PeopleAltRoundedIcon /> },
  { label: 'Doanh thu', path: '/revenue', icon: <MonetizationOnRoundedIcon /> },
  { label: 'Dịch vụ', path: '/services', icon: <ContentCutRoundedIcon /> },
];

export default function BottomTabBar() {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = MENU_ITEMS.find(
    (item) => location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/')
  )?.path ?? '/dashboard';

  return (
    <Paper
      elevation={8}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: theme.zIndex.drawer + 1,
        borderTop: `1px solid ${isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
        bgcolor: isDark ? 'rgba(18,18,18,0.95)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <BottomNavigation
        value={currentPath}
        onChange={(_, newVal) => navigate(newVal)}
        showLabels
        sx={{
          bgcolor: 'transparent',
          minHeight: 56,
          '& .MuiBottomNavigationAction-root': {
            color: isDark ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)',
            minWidth: 'auto',
            py: 0.5,
            transition: 'color 0.2s',
            '&.Mui-selected': {
              color: theme.palette.primary.main,
            },
            '& .MuiBottomNavigationAction-label': {
              fontSize: '0.65rem',
              '&.Mui-selected': {
                fontSize: '0.7rem',
              },
            },
            '& .MuiSvgIcon-root': {
              fontSize: '1.3rem',
              transition: 'transform 0.2s',
            },
            '&.Mui-selected .MuiSvgIcon-root': {
              transform: 'scale(1.1)',
            },
          },
        }}
      >
        {MENU_ITEMS.map((item) => (
          <BottomNavigationAction
            key={item.path}
            label={item.label}
            value={item.path}
            icon={item.icon}
          />
        ))}
      </BottomNavigation>
    </Paper>
  );
}
