import '@testing-library/jest-dom';
import { useRevenueStore } from './revenueStore';
import { revenueService } from '../services/revenueService';

jest.mock('../services/revenueService');

describe('revenueStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useRevenueStore.setState({
      orders: [], totalOrders: 0, ordersByDate: [], totalDays: 0,
      ordersByEmployee: [], totalDateEmployees: 0, monthlyRevenue: [], totalMonthlyRecords: 0,
      selectedOrder: null, isLoading: false, error: null, activeTab: 'all',
    });
  });

  it('has correct initial state', () => {
    const state = useRevenueStore.getState();
    expect(state.orders).toEqual([]);
    expect(state.activeTab).toBe('all');
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('fetchOrders sets data on success', async () => {
    (revenueService.getOrders as jest.Mock).mockResolvedValueOnce({ orders: [{ id: 1 }], total_orders: 1 });
    await useRevenueStore.getState().fetchOrders();
    const state = useRevenueStore.getState();
    expect(state.orders).toHaveLength(1);
    expect(state.isLoading).toBe(false);
  });

  it('fetchOrders sets error on failure', async () => {
    (revenueService.getOrders as jest.Mock).mockRejectedValueOnce(new Error('Fail'));
    await useRevenueStore.getState().fetchOrders();
    expect(useRevenueStore.getState().error).toBe('Fail');
  });

  it('setActiveTab changes tab', () => {
    useRevenueStore.getState().setActiveTab('by_date');
    expect(useRevenueStore.getState().activeTab).toBe('by_date');
  });

  it('setSelectedOrder updates state', () => {
    useRevenueStore.getState().setSelectedOrder({ id: 1 } as any);
    expect(useRevenueStore.getState().selectedOrder).toEqual({ id: 1 });
  });

  it('clearError clears error', () => {
    useRevenueStore.setState({ error: 'Error' });
    useRevenueStore.getState().clearError();
    expect(useRevenueStore.getState().error).toBeNull();
  });
});
