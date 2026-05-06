import apiClient from '@blockhouse/shared-lib/api/client';
  import { API_ENDPOINTS } from '@blockhouse/shared-lib/api/endpoints';
  import { Service, ServiceListParams, ServiceListResponse, ServiceFormData } from '../types/service.types';

  export const serviceService = {
    async getServices(params?: ServiceListParams): Promise<ServiceListResponse> {
      const response = await apiClient.get<{ data: ServiceListResponse }>(API_ENDPOINTS.SERVICES, {
        data: params,
      });
      return response.data.data ?? response.data;
    },

    async getAllServices(): Promise<Service[]> {
      const response = await apiClient.get<{ data: Service[] }>(API_ENDPOINTS.SERVICES_ALL);
      return response.data.data ?? response.data;
    },

    async createService(data: ServiceFormData): Promise<Service> {
      const response = await apiClient.post<{ data: Service }>(API_ENDPOINTS.SERVICES, data);
      return response.data.data ?? response.data;
    },

    async updateService(id: number, data: ServiceFormData): Promise<Service> {
      const response = await apiClient.put<{ data: Service }>(API_ENDPOINTS.SERVICE_BY_ID(id), data);
      return response.data.data ?? response.data;
    },
  };