 import apiClient from '@blockhouse/shared-lib/api/client';
  import { API_ENDPOINTS } from '@blockhouse/shared-lib/api/endpoints';
  import { DashboardData, DashboardParams } from '../types/dashboard.types';

  export const dashboardService = {
    async getDashboard(params?: DashboardParams, options?: { signal?: AbortSignal }): Promise<DashboardData> {
      const data: any = await apiClient.get(API_ENDPOINTS.DASHBOARD, { params, signal: options?.signal });
      return data.data ?? data;
    },
  };
