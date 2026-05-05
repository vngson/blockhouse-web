import React, { lazy, Suspense } from 'react';
  import { Routes, Route } from 'react-router-dom';
  import LoadingSpinner from '../components/Loading/LoadingSpinner';
  import NotFound from '../components/NotFound/NotFound';

  const Dashboard = lazy(() => import('mf_dashboard/Dashboard'));
  const Employees = lazy(() => import('mf_employees/Employees'));
  const Revenue = lazy(() => import('mf_revenue/Revenue'));
  const Services = lazy(() => import('mf_services/Services'));

  export default function AppRoutes() {
    return (
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/revenue" element={<Revenue />} />
          <Route path="/services" element={<Services />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    );
  }