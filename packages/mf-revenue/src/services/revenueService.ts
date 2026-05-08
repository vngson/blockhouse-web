import apiClient from '@blockhouse/shared-lib/api/client';
import { API_ENDPOINTS } from '@blockhouse/shared-lib/api/endpoints';
import {
  Order,
  OrderListParams,
  OrderListResponse,
  OrdersByDateResponse,
  OrdersByEmployeeAndDateResponse,
  CreateOrderRequest,
  MonthlyRevenueResponse,
} from '../types/revenue.types';

export const revenueService = {
  async getOrders(params?: OrderListParams, options?: { signal?: AbortSignal }): Promise<OrderListResponse> {
    const data: any = await apiClient.post(API_ENDPOINTS.ORDERS, params, { signal: options?.signal });
    return data.data ?? data;
  },

  async getOrderById(id: number): Promise<Order> {
    const data: any = await apiClient.get(API_ENDPOINTS.ORDER_BY_ID(id));
    return data.data ?? data;
  },

  async createOrder(formData: CreateOrderRequest): Promise<Order> {
    const data: any = await apiClient.post(API_ENDPOINTS.CREATE_ORDER, formData);
    return data.data ?? data;
  },

  async updateOrder(id: number, formData: Partial<CreateOrderRequest>): Promise<Order> {
    const data: any = await apiClient.put(API_ENDPOINTS.ORDER_BY_ID(id), formData);
    return data.data ?? data;
  },

  async deleteOrder(id: number): Promise<void> {
    await apiClient.delete(API_ENDPOINTS.ORDER_BY_ID(id));
  },

  async getOrdersByDate(params?: OrderListParams, options?: { signal?: AbortSignal }): Promise<OrdersByDateResponse> {
    const data: any = await apiClient.post(API_ENDPOINTS.ORDERS_BY_DATE, params, { signal: options?.signal });
    return data.data ?? data;
  },

  async getRevenueByEmployee(params?: OrderListParams, options?: { signal?: AbortSignal }): Promise<OrdersByEmployeeAndDateResponse> {
    const data: any = await apiClient.post(API_ENDPOINTS.ORDERS_BY_EMPLOYEE, params, { signal: options?.signal });
    return data.data ?? data;
  },

  async getMonthlyRevenueByEmployee(params?: OrderListParams, options?: { signal?: AbortSignal }): Promise<MonthlyRevenueResponse> {
    const data: any = await apiClient.post(API_ENDPOINTS.REVENUE_MONTHLY_BY_EMPLOYEE, params, { signal: options?.signal });
    return data.data ?? data;
  },
};
