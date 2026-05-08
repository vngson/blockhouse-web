import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoadingSpinner from '../components/Loading/LoadingSpinner';
import { ErrorBoundary } from '../components/ErrorBoundary';
import NotFound from '../components/NotFound/NotFound';

const Dashboard = lazy(() => import('mf_dashboard/Dashboard'));
const Employees = lazy(() => import('mf_employees/Employees'));
const Revenue = lazy(() => import('mf_revenue/Revenue'));
const Services = lazy(() => import('mf_services/Services'));

function RemoteRoute({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingSpinner />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<RemoteRoute><Dashboard /></RemoteRoute>} />
      <Route path="/dashboard" element={<RemoteRoute><Dashboard /></RemoteRoute>} />
      <Route path="/employees" element={<RemoteRoute><Employees /></RemoteRoute>} />
      <Route path="/revenue" element={<RemoteRoute><Revenue /></RemoteRoute>} />
      <Route path="/services" element={<RemoteRoute><Services /></RemoteRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
