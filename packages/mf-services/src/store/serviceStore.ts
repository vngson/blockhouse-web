import { create } from 'zustand';
import axios from 'axios';
import { Service, ServiceListParams, ServiceFormData } from '../types/service.types';
import { serviceService } from '../services/serviceService';

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Lỗi không xác định';
}

interface ServiceState {
  services: Service[];
  totalServices: number;
  selectedService: Service | null;
  isLoading: boolean;
  error: string | null;
  fetchServices: (params?: ServiceListParams, options?: { signal?: AbortSignal }) => Promise<void>;
  createService: (data: ServiceFormData) => Promise<void>;
  updateService: (id: number, data: ServiceFormData) => Promise<void>;
  setSelectedService: (service: Service | null) => void;
  clearError: () => void;
}

export const useServiceStore = create<ServiceState>((set) => ({
  services: [],
  totalServices: 0,
  selectedService: null,
  isLoading: false,
  error: null,

  fetchServices: async (params, options) => {
    set({ isLoading: true, error: null });
    try {
      const response = await serviceService.getServices(params, options);
      set({
        services: response.services ?? [],
        totalServices: response.total_services ?? 0,
        isLoading: false,
      });
    } catch (error: unknown) {
      if (axios.isCancel(error)) return;
      set({ error: getErrorMessage(error), isLoading: false });
    }
  },

  createService: async (data) => {
    set({ error: null });
    try {
      await serviceService.createService(data);
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      set({ error: message });
      throw new Error(message);
    }
  },

  updateService: async (id, data) => {
    set({ error: null });
    try {
      await serviceService.updateService(id, data);
      set({ selectedService: null });
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      set({ error: message });
      throw new Error(message);
    }
  },

  setSelectedService: (service) => set({ selectedService: service }),
  clearError: () => set({ error: null }),
}));
