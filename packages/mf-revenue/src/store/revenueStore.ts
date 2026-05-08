import { create } from 'zustand';
import axios from 'axios';
import {
  Order,
  OrderListParams,
  OrderByDate,
  OrderByEmployeeAndDate,
  CreateOrderRequest,
  MonthlyRevenueRecord,
} from '../types/revenue.types';
import { revenueService } from '../services/revenueService';

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Lỗi không xác định';
}

type RevenueTab = 'all' | 'by_date' | 'by_employee' | 'monthly';

interface RevenueState {
  // — Data: all orders tab —
  orders: Order[];
  totalOrders: number;

  // — Data: by date tab —
  ordersByDate: OrderByDate[];
  totalDays: number;

  // — Data: by employee tab —
  ordersByEmployee: OrderByEmployeeAndDate[];
  totalDateEmployees: number;

  // — Data: monthly tab —
  monthlyRevenue: MonthlyRevenueRecord[];
  totalMonthlyRecords: number;

  // — UI state —
  selectedOrder: Order | null;
  isLoading: boolean;
  isMutating: boolean;
  error: string | null;
  activeTab: RevenueTab;

  // — Last params for auto-refresh after mutations —
  lastFetchParams: OrderListParams | null;
  lastMonthParams: { date_from: string; date_to: string } | null;

  // — Fetch actions —
  fetchOrders: (params?: OrderListParams, options?: { signal?: AbortSignal }) => Promise<void>;
  fetchOrdersByDate: (params?: OrderListParams, options?: { signal?: AbortSignal }) => Promise<void>;
  fetchRevenueByEmployee: (params?: OrderListParams, options?: { signal?: AbortSignal }) => Promise<void>;
  fetchMonthlyRevenue: (params?: OrderListParams & { date_from?: string; date_to?: string }, options?: { signal?: AbortSignal }) => Promise<void>;

  // — Mutation actions (auto-refresh after success) —
  createOrder: (data: CreateOrderRequest) => Promise<void>;
  updateOrder: (id: number, data: Partial<CreateOrderRequest>) => Promise<void>;
  deleteOrder: (id: number) => Promise<void>;

  // — UI actions —
  setSelectedOrder: (order: Order | null) => void;
  setActiveTab: (tab: RevenueTab) => void;
  clearError: () => void;
}

function refreshActiveTab(
  get: () => RevenueState,
  set: (partial: Partial<RevenueState>) => void,
) {
  const { activeTab, lastFetchParams, lastMonthParams } = get();
  const params = lastFetchParams ?? {};
  switch (activeTab) {
    case 'all':
      get().fetchOrders(params);
      break;
    case 'by_date':
      get().fetchOrdersByDate(params);
      break;
    case 'by_employee':
      get().fetchRevenueByEmployee(params);
      break;
    case 'monthly':
      get().fetchMonthlyRevenue({ ...params, ...lastMonthParams });
      break;
  }
}

export const useRevenueStore = create<RevenueState>((set, get) => ({
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
  isMutating: false,
  error: null,
  activeTab: 'all',
  lastFetchParams: null,
  lastMonthParams: null,

  // — Fetch actions —

  fetchOrders: async (params, options) => {
    set({ isLoading: true, error: null, lastFetchParams: params ?? null });
    try {
      const response = await revenueService.getOrders(params, options);
      set({ orders: response.orders ?? [], totalOrders: response.total_orders ?? 0, isLoading: false });
    } catch (error: unknown) {
      if (axios.isCancel(error)) return;
      set({ error: getErrorMessage(error), isLoading: false });
    }
  },

  fetchOrdersByDate: async (params, options) => {
    set({ isLoading: true, error: null, lastFetchParams: params ?? null });
    try {
      const response = await revenueService.getOrdersByDate(params, options);
      set({ ordersByDate: response.orders_by_date ?? [], totalDays: response.total_days ?? 0, isLoading: false });
    } catch (error: unknown) {
      if (axios.isCancel(error)) return;
      set({ error: getErrorMessage(error), isLoading: false });
    }
  },

  fetchRevenueByEmployee: async (params, options) => {
    set({ isLoading: true, error: null, lastFetchParams: params ?? null });
    try {
      const response = await revenueService.getRevenueByEmployee(params, options);
      set({ ordersByEmployee: response.revenue_by_employee ?? [], totalDateEmployees: response.total_date_employees ?? 0, isLoading: false });
    } catch (error: unknown) {
      if (axios.isCancel(error)) return;
      set({ error: getErrorMessage(error), isLoading: false });
    }
  },

  fetchMonthlyRevenue: async (params, options) => {
    set({
      isLoading: true, error: null,
      lastFetchParams: params ?? null,
      lastMonthParams: params?.date_from && params?.date_to
        ? { date_from: params.date_from, date_to: params.date_to }
        : null,
    });
    try {
      const response = await revenueService.getMonthlyRevenueByEmployee(params, options);
      set({
        monthlyRevenue: response.revenue_monthly_by_employee ?? [],
        totalMonthlyRecords: response.total_records ?? 0,
        isLoading: false,
      });
    } catch (error: unknown) {
      if (axios.isCancel(error)) return;
      set({ error: getErrorMessage(error), isLoading: false });
    }
  },

  // — Mutation actions —

  createOrder: async (data) => {
    set({ isMutating: true, error: null });
    try {
      await revenueService.createOrder(data);
      set({ isMutating: false });
      refreshActiveTab(get, set);
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      set({ error: message, isMutating: false });
      throw new Error(message);
    }
  },

  updateOrder: async (id, data) => {
    set({ isMutating: true, error: null });
    try {
      await revenueService.updateOrder(id, data);
      set({ selectedOrder: null, isMutating: false });
      refreshActiveTab(get, set);
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      set({ error: message, isMutating: false });
      throw new Error(message);
    }
  },

  deleteOrder: async (id) => {
    set({ isMutating: true, error: null });
    try {
      await revenueService.deleteOrder(id);
      set({ isMutating: false });
      refreshActiveTab(get, set);
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      set({ error: message, isMutating: false });
      throw new Error(message);
    }
  },

  // — UI actions —

  setSelectedOrder: (order) => set({ selectedOrder: order }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  clearError: () => set({ error: null }),
}));
