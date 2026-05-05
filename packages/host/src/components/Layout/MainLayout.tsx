import React, { useState } from 'react';
  import { Box } from '@mui/material';
  import Sidebar from './Sidebar';
  import Header from './Header';

  const SIDEBAR_WIDTH = 240;

  interface MainLayoutProps {
    children: React.ReactNode;
  }

  export default function MainLayout({ children }: MainLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <Sidebar open={sidebarOpen} width={SIDEBAR_WIDTH} />
        <Box
          sx={{
            flexGrow: 1,
            ml: sidebarOpen ? `${SIDEBAR_WIDTH}px` : 0,
            transition: 'margin 0.3s',
          }}
        >
          <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <Box component="main" sx={{ p: 3 }}>
            {children}
          </Box>
        </Box>
      </Box>
    );
  }