import { create } from 'zustand';
  import {
    Order,
    OrderListParams,
    OrderByDate,
    OrderByEmployeeAndDate,
    CreateOrderRequest,
    MonthlyRevenueRecord,
  } from '../types/revenue.types';
  import { revenueService } from '../services/revenueService';

  type RevenueTab = 'all' | 'by_date' | 'by_employee' | 'monthly';

  interface RevenueState {
    orders: Order[];
    totalOrders: number;
    ordersByDate: OrderByDate[];
    totalDays: number;
    ordersByEmployee: OrderByEmployeeAndDate[];
    totalDateEmployees: number;
    monthlyRevenue: MonthlyRevenueRecord[];
    totalMonthlyRecords: number;
    selectedOrder: Order | null;
    isLoading: boolean;
    error: string | null;
    activeTab: RevenueTab;

    fetchOrders: (params?: OrderListParams) => Promise<void>;
    fetchOrdersByDate: (params?: OrderListParams) => Promise<void>;
    fetchRevenueByEmployee: (params?: OrderListParams) => Promise<void>;
    fetchMonthlyRevenue: (params?: OrderListParams) => Promise<void>;
    createOrder: (data: CreateOrderRequest) => Promise<void>;
    updateOrder: (id: number, data: Partial<CreateOrderRequest>) => Promise<void>;
    deleteOrder: (id: number) => Promise<void>;
    setSelectedOrder: (order: Order | null) => void;
    setActiveTab: (tab: RevenueTab) => void;
    clearError: () => void;
  }

  export const useRevenueStore = create<RevenueState>((set) => ({
    orders: [],
    totalOrders: 0,
    ordersByDate: [],
    totalDays: 0,
    ordersByEmployee: [],
    totalDateEmployees: 0,
    monthlyRevenue: [],
    totalMonthlyRecords: 0,
    selectedOrder: null,
    isLoading: false,
    error: null,
    activeTab: 'all',

    fetchOrders: async (params) => {
      set({ isLoading: true, error: null });
      try {
        const response = await revenueService.getOrders(params);
        set({ orders: response.orders ?? [], totalOrders: response.total_orders ?? 0, isLoading: false });
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
      }
    },

    fetchOrdersByDate: async (params) => {
      set({ isLoading: true, error: null });
      try {
        const response = await revenueService.getOrdersByDate(params);
        set({ ordersByDate: response.orders_by_date ?? [], totalDays: response.total_days ?? 0, isLoading: false });
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
      }
    },

    fetchRevenueByEmployee: async (params) => {
      set({ isLoading: true, error: null });
      try {
        const response = await revenueService.getRevenueByEmployee(params);
        set({ ordersByEmployee: response.revenue_by_employee ?? [], totalDateEmployees: response.total_date_employees ?? 0, isLoading:    
  false });
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
      }
    },

    fetchMonthlyRevenue: async (params) => {
      set({ isLoading: true, error: null });
      try {
        const response = await revenueService.getMonthlyRevenueByEmployee(params);
        set({
          monthlyRevenue: response.revenue_monthly_by_employee ?? [],
          totalMonthlyRecords: response.total_records ?? 0,
          isLoading: false,
        });
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
      }
    },

    createOrder: async (data) => {
      await revenueService.createOrder(data);
    },

    updateOrder: async (id, data) => {
      await revenueService.updateOrder(id, data);
      set({ selectedOrder: null });
    },

    deleteOrder: async (id) => {
      await revenueService.deleteOrder(id);
    },

    setSelectedOrder: (order) => set({ selectedOrder: order }),
    setActiveTab: (tab) => set({ activeTab: tab }),
    clearError: () => set({ error: null }),
  }));