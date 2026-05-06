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
    async getOrders(params?: OrderListParams): Promise<OrderListResponse> {
      const response = await apiClient.post<{ data: OrderListResponse }>(
        API_ENDPOINTS.ORDERS,
        params
      );
      return response.data.data ?? response.data;
    },

    async getOrderById(id: number): Promise<Order> {
      const response = await apiClient.get<{ data: Order }>(API_ENDPOINTS.ORDER_BY_ID(id));
      return response.data.data ?? response.data;
    },

    async createOrder(data: CreateOrderRequest): Promise<Order> {
      const response = await apiClient.post<{ data: Order }>(API_ENDPOINTS.CREATE_ORDER, data);
      return response.data.data ?? response.data;
    },

    async updateOrder(id: number, data: Partial<CreateOrderRequest>): Promise<Order> {
      const response = await apiClient.put<{ data: Order }>(API_ENDPOINTS.ORDER_BY_ID(id), data);
      return response.data.data ?? response.data;
    },

    async deleteOrder(id: number): Promise<void> {
      await apiClient.delete(API_ENDPOINTS.ORDER_BY_ID(id));
    },

    async getOrdersByDate(params?: OrderListParams): Promise<OrdersByDateResponse> {
      const response = await apiClient.post<{ data: OrdersByDateResponse }>(
        API_ENDPOINTS.ORDERS_BY_DATE,
        params
      );
      return response.data.data ?? response.data;
    },

    async getRevenueByEmployee(params?: OrderListParams): Promise<OrdersByEmployeeAndDateResponse> {
      const response = await apiClient.post<{ data: OrdersByEmployeeAndDateResponse }>(
        API_ENDPOINTS.ORDERS_BY_EMPLOYEE,
        params
      );
      return response.data.data ?? response.data;
    },

    async getMonthlyRevenueByEmployee(params?: OrderListParams): Promise<MonthlyRevenueResponse> {
      const response = await apiClient.post<{ data: MonthlyRevenueResponse }>(
        API_ENDPOINTS.REVENUE_MONTHLY_BY_EMPLOYEE,
        params
      );
      return response.data.data ?? response.data;
    },
  };