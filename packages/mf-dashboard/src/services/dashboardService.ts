 import apiClient from '@blockhouse/shared-lib/api/client';
  import { API_ENDPOINTS } from '@blockhouse/shared-lib/api/endpoints';
  import { DashboardData, DashboardParams } from '../types/dashboard.types';
                                                                                                                                                                                                     
  const MOCK_DATA: DashboardData = {                                                                                                          total_revenue: 125800000,                                                                                                                 total_service_sales: 342,                                                                                                             
    growth_percent: 12.5,
    top_employees: [
      { id: 1, name: 'Nguyễn Văn A', revenue: 35000000, order_count: 85 },
      { id: 2, name: 'Trần Thị B', revenue: 28000000, order_count: 72 },
      { id: 3, name: 'Lê Văn C', revenue: 22500000, order_count: 58 },
      { id: 4, name: 'Phạm Thị D', revenue: 18300000, order_count: 47 }
    ],
    monthly_chart: [
      {
        service_id: 1,
        service_name: 'Cắt tóc nam',
        monthly_data: [
          { month: 1, revenue: 12000000, quantity: 48 },
          { month: 2, revenue: 13500000, quantity: 54 },
          { month: 3, revenue: 15000000, quantity: 60 },
        ],
      },
      {
        service_id: 2,
        service_name: 'Cắt tóc nữ',
        monthly_data: [
          { month: 1, revenue: 8000000, quantity: 20 },
          { month: 2, revenue: 9500000, quantity: 24 },
          { month: 3, revenue: 11000000, quantity: 28 },
        ],
      },
      {
        service_id: 3,
        service_name: 'Uốn / Nhuộm',
        monthly_data: [
          { month: 1, revenue: 18000000, quantity: 15 },
          { month: 2, revenue: 22000000, quantity: 18 },
          { month: 3, revenue: 25000000, quantity: 22 },
        ],
      },
    ],
  };

  export const dashboardService = {
    async getDashboard(params?: DashboardParams): Promise<DashboardData> {
      // TODO: Đổi lại gọi API khi có backend
      const response = await apiClient.get<{ data: DashboardData }>(API_ENDPOINTS.DASHBOARD, { params });
      return response.data.data ?? response.data;
      // return MOCK_DATA;
    },
  };