import React from 'react';
  import {
    Box,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Divider,
  } from '@mui/material';
  import DashboardIcon from '@mui/icons-material/Dashboard';
  import PeopleIcon from '@mui/icons-material/People';
  import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
  import ContentCutIcon from '@mui/icons-material/ContentCut';
  import { useLocation, useNavigate } from 'react-router-dom';

  const MENU_ITEMS = [
    { label: 'Dashboard', path: '/dashboard', icon: <DashboardIcon /> },
    { label: 'Nhân viên', path: '/employees', icon: <PeopleIcon /> },
    { label: 'Doanh thu', path: '/revenue', icon: <AttachMoneyIcon /> },
    { label: 'Dịch vụ', path: '/services', icon: <ContentCutIcon /> },
  ];

  interface SidebarProps {
    open: boolean;
    width: number;
  }

  export default function Sidebar({ open, width }: SidebarProps) {
    const location = useLocation();
    const navigate = useNavigate();

    return (
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: open ? width : 0,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: width,
            boxSizing: 'border-box',
          },
        }}
      >
        <Box sx={{ p: 2, textAlign: 'center' }}>
          <Typography variant="h6" fontWeight={700} color="primary">
            BlockHouse
          </Typography>
        </Box>
        <Divider />
        <List>
          {MENU_ITEMS.map((item) => (
            <ListItem key={item.path} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/')}
                onClick={() => navigate(item.path)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    );
  }