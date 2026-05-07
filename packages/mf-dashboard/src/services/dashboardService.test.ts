import '@testing-library/jest-dom';
import apiClient from '@blockhouse/shared-lib/api/client';
import { API_ENDPOINTS } from '@blockhouse/shared-lib/api/endpoints';
import { dashboardService } from './dashboardService';

jest.mock('@blockhouse/shared-lib/api/client');
const mockedGet = apiClient.get as jest.MockedFunction<typeof apiClient.get>;

describe('dashboardService', () => {
  beforeEach(() => jest.clearAllMocks());

  it('calls GET on dashboard endpoint', async () => {
    const mockData = { total_revenue: 100000, total_service_sales: 50, growth_percent: 10, top_employees: [], monthly_chart: [] };
    mockedGet.mockResolvedValueOnce({ data: { data: mockData } } as any);

    const result = await dashboardService.getDashboard();
    expect(mockedGet).toHaveBeenCalledWith(API_ENDPOINTS.DASHBOARD, { params: undefined });
    expect(result.total_revenue).toBe(100000);
  });

  it('passes params to API call', async () => {
    mockedGet.mockResolvedValueOnce({ data: { data: { total_revenue: 0, total_service_sales: 0, growth_percent: 0, top_employees: [], monthly_chart: [] } } } as any);

    await dashboardService.getDashboard({ month: 5, year: 2024 });
    expect(mockedGet).toHaveBeenCalledWith(API_ENDPOINTS.DASHBOARD, { params: { month: 5, year: 2024 } });
  });
});
