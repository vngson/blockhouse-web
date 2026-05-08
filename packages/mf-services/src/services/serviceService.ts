import apiClient from '@blockhouse/shared-lib/api/client';
  import { API_ENDPOINTS } from '@blockhouse/shared-lib/api/endpoints';
  import { Service, ServiceListParams, ServiceListResponse, ServiceFormData } from '../types/service.types';

  export const serviceService = {
    async getServices(params?: ServiceListParams, options?: { signal?: AbortSignal }): Promise<ServiceListResponse> {
      const data: any = await apiClient.get(API_ENDPOINTS.SERVICES, {
        data: params,
        signal: options?.signal,
      });
      return data.data ?? data;
    },

    async getAllServices(): Promise<Service[]> {
      const data: any = await apiClient.get(API_ENDPOINTS.SERVICES_ALL);
      return data.data ?? data;
    },

    async createService(formData: ServiceFormData): Promise<Service> {
      const data: any = await apiClient.post(API_ENDPOINTS.SERVICES, formData);
      return data.data ?? data;
    },

    async updateService(id: number, formData: ServiceFormData): Promise<Service> {
      const data: any = await apiClient.put(API_ENDPOINTS.SERVICE_BY_ID(id), formData);
      return data.data ?? data;
    },
  };
