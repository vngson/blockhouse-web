 import React from 'react';
  import { AppBar, Toolbar, Typography, IconButton, Box } from '@mui/material';
  import MenuIcon from '@mui/icons-material/Menu';

  interface HeaderProps {
    onToggleSidebar: () => void;
  }

  export default function Header({ onToggleSidebar }: HeaderProps) {
    return (
      <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
        <Toolbar>
          <IconButton edge="start" onClick={onToggleSidebar} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="text.primary">
            Quản lý tiệm Barber
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }