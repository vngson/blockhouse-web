import { create } from 'zustand';
import { Service, ServiceListParams, ServiceFormData } from '../types/service.types';
import { serviceService } from '../services/serviceService';

interface ServiceState {
  services: Service[];
  totalServices: number;
  selectedService: Service | null;
  isLoading: boolean;
  error: string | null;
  fetchServices: (params?: ServiceListParams) => Promise<void>;
  createService: (data: ServiceFormData) => Promise<void>;
  updateService: (id: number, data: ServiceFormData) => Promise<void>;
  setSelectedService: (service: Service | null) => void;
  clearError: () => void;
}

export const useServiceStore = create<ServiceState>((set, get) => ({
  services: [],
  totalServices: 0,
  selectedService: null,
  isLoading: false,
  error: null,

  fetchServices: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const response = await serviceService.getServices(params);
      set({
        services: response.services ?? [],
        totalServices: response.total_services ?? 0,
        isLoading: false,
      });
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false });
    }
  },

  createService: async (data) => {
    await serviceService.createService(data);
  },

  updateService: async (id, data) => {
    await serviceService.updateService(id, data);
    set({ selectedService: null });
  },

  setSelectedService: (service) => set({ selectedService: service }),
  clearError: () => set({ error: null }),
}));
