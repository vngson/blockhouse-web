import { create } from 'zustand';
import axios from 'axios';
import { DashboardData, DashboardParams } from '../types/dashboard.types';
import { dashboardService } from '../services/dashboardService';

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Lỗi không xác định';
}

interface DashboardState {
  data: DashboardData | null;
  isLoading: boolean;
  error: string | null;
  selectedMonth: number | null;
  selectedYear: number | null;
  fetchDashboard: (params?: DashboardParams, options?: { signal?: AbortSignal }) => Promise<void>;
  setMonth: (month: number | null) => void;
  setYear: (year: number | null) => void;
}

export const useDashboardStore = create<DashboardState>((set) => ({
  data: null,
  isLoading: false,
  error: null,
  selectedMonth: null,
  selectedYear: null,

  fetchDashboard: async (params, options) => {
    set({ isLoading: true, error: null });
    try {
      const data = await dashboardService.getDashboard(params, options);
      set({ data, isLoading: false });
    } catch (error: unknown) {
      if (axios.isCancel(error)) return;
      set({ error: getErrorMessage(error), isLoading: false });
    }
  },

  setMonth: (month) => {
    set({ selectedMonth: month });
  },
  setYear: (year) => {
    set({ selectedYear: year });
  },
}));
