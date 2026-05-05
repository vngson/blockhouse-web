import React from 'react';
  import { Box } from '@mui/material';
  import AppRoutes from './routes';
  import MainLayout from '../components/Layout/MainLayout';

  export default function App() {
    return (
      <MainLayout>
        <AppRoutes />
      </MainLayout>
    );
  }