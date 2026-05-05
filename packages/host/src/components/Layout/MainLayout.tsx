import React, { useState } from 'react';
  import { Box } from '@mui/material';
  import Sidebar from './Sidebar';
  import Header from './Header';

  const SIDEBAR_WIDTH = 260;

  interface MainLayoutProps {
    children: React.ReactNode;
  }

  export default function MainLayout({ children }: MainLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
        <Sidebar open={sidebarOpen} width={SIDEBAR_WIDTH} />
        <Box
          sx={{
            flexGrow: 1,
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100vh',
          }}
        >
          <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <Box
            component="main"
            sx={{
              flex: 1,
              p: 3,
            }}
          >
            {children}
          </Box>
        </Box>
      </Box>
    );
  }
