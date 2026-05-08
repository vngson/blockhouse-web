 import apiClient from '@blockhouse/shared-lib/api/client';
  import { API_ENDPOINTS } from '@blockhouse/shared-lib/api/endpoints';
  import { DashboardData, DashboardParams } from '../types/dashboard.types';

  export const dashboardService = {
    async getDashboard(params?: DashboardParams): Promise<DashboardData> {
      const response = await apiClient.get<{ data: DashboardData }>(API_ENDPOINTS.DASHBOARD, { params });
      return response.data.data ?? response.data;
    },
  };
