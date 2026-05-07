import '@testing-library/jest-dom';
import { useDashboardStore } from './dashboardStore';
import { dashboardService } from '../services/dashboardService';

jest.mock('../services/dashboardService');

describe('dashboardStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useDashboardStore.setState({
      data: null,
      isLoading: false,
      error: null,
      selectedMonth: null,
      selectedYear: null,
    });
  });

  it('has correct initial state', () => {
    const state = useDashboardStore.getState();
    expect(state.data).toBeNull();
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.selectedMonth).toBeNull();
    expect(state.selectedYear).toBeNull();
  });

  it('fetchDashboard sets data on success', async () => {
    const mockData = {
      total_revenue: 500000,
      total_service_sales: 100,
      growth_percent: 15,
      top_employees: [],
      monthly_chart: [],
    };
    (dashboardService.getDashboard as jest.Mock).mockResolvedValueOnce(mockData);

    await useDashboardStore.getState().fetchDashboard();

    const state = useDashboardStore.getState();
    expect(state.data).toEqual(mockData);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('fetchDashboard sets error on failure', async () => {
    (dashboardService.getDashboard as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await useDashboardStore.getState().fetchDashboard();

    const state = useDashboardStore.getState();
    expect(state.data).toBeNull();
    expect(state.error).toBe('Network error');
    expect(state.isLoading).toBe(false);
  });

  it('setMonth updates selectedMonth', () => {
    useDashboardStore.getState().setMonth(5);
    expect(useDashboardStore.getState().selectedMonth).toBe(5);
  });

  it('setYear updates selectedYear', () => {
    useDashboardStore.getState().setYear(2024);
    expect(useDashboardStore.getState().selectedYear).toBe(2024);
  });
});
