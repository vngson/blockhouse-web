import '@testing-library/jest-dom';
import apiClient from '@blockhouse/shared-lib/api/client';
import { API_ENDPOINTS } from '@blockhouse/shared-lib/api/endpoints';
import { revenueService } from './revenueService';

jest.mock('@blockhouse/shared-lib/api/client');
const mockedClient = apiClient as jest.Mocked<typeof apiClient>;

describe('revenueService', () => {
  beforeEach(() => jest.clearAllMocks());

  it('getOrders calls POST', async () => {
    mockedClient.post.mockResolvedValueOnce({ data: { data: { orders: [], total_orders: 0 } } } as any);
    await revenueService.getOrders({ page: 1 });
    expect(mockedClient.post).toHaveBeenCalledWith(API_ENDPOINTS.ORDERS, { page: 1 }, { signal: undefined });
  });

  it('getOrderById calls GET', async () => {
    mockedClient.get.mockResolvedValueOnce({ data: { data: { id: 1 } } } as any);
    await revenueService.getOrderById(1);
    expect(mockedClient.get).toHaveBeenCalledWith(API_ENDPOINTS.ORDER_BY_ID(1));
  });

  it('createOrder calls POST to create endpoint', async () => {
    mockedClient.post.mockResolvedValueOnce({ data: { data: { id: 1 } } } as any);
    await revenueService.createOrder({ datetime: '2024-01-01T10:00', employee_id: 1, total: 50000, services: [] });
    expect(mockedClient.post).toHaveBeenCalledWith(API_ENDPOINTS.CREATE_ORDER, expect.any(Object));
  });

  it('updateOrder calls PUT', async () => {
    mockedClient.put.mockResolvedValueOnce({ data: { data: { id: 1 } } } as any);
    await revenueService.updateOrder(1, { total: 60000 });
    expect(mockedClient.put).toHaveBeenCalledWith(API_ENDPOINTS.ORDER_BY_ID(1), { total: 60000 });
  });

  it('deleteOrder calls DELETE', async () => {
    mockedClient.delete.mockResolvedValueOnce({} as any);
    await revenueService.deleteOrder(1);
    expect(mockedClient.delete).toHaveBeenCalledWith(API_ENDPOINTS.ORDER_BY_ID(1));
  });

  it('getOrdersByDate calls POST to by_date endpoint', async () => {
    mockedClient.post.mockResolvedValueOnce({ data: { data: { orders_by_date: [], total_days: 0 } } } as any);
    await revenueService.getOrdersByDate({ page: 1 });
    expect(mockedClient.post).toHaveBeenCalledWith(API_ENDPOINTS.ORDERS_BY_DATE, { page: 1 }, { signal: undefined });
  });

  it('getRevenueByEmployee calls POST to revenue endpoint', async () => {
    mockedClient.post.mockResolvedValueOnce({ data: { data: { revenue_by_employee: [], total_date_employees: 0 } } } as any);
    await revenueService.getRevenueByEmployee({ page: 1 });
    expect(mockedClient.post).toHaveBeenCalledWith(API_ENDPOINTS.ORDERS_BY_EMPLOYEE, { page: 1 }, { signal: undefined });
  });
});
