import { create } from 'zustand';
  import { DashboardData, DashboardParams } from '../types/dashboard.types';
  import { dashboardService } from '../services/dashboardService';

  interface DashboardState {
    data: DashboardData | null;
    isLoading: boolean;
    error: string | null;
    selectedMonth: number | null;
    selectedYear: number | null;
    fetchDashboard: (params?: DashboardParams) => Promise<void>;
    setMonth: (month: number | null) => void;
    setYear: (year: number | null) => void;
  }

  export const useDashboardStore = create<DashboardState>((set) => ({
    data: null,
    isLoading: false,
    error: null,
    selectedMonth: null,
    selectedYear: null,

    fetchDashboard: async (params) => {
      set({ isLoading: true, error: null });
      try {
        const data = await dashboardService.getDashboard(params);
        set({ data, isLoading: false });
      } catch (error) {
        set({ error: (error as Error).message, isLoading: false });
      }
    },

    setMonth: (month) => {
      set({ selectedMonth: month });
    },

    setYear: (year) => {
      set({ selectedYear: year });
    },
  }));