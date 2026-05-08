import apiClient from '@blockhouse/shared-lib/api/client';
  import { API_ENDPOINTS } from '@blockhouse/shared-lib/api/endpoints';
  import { Employee, EmployeeListParams, EmployeeListResponse, EmployeeAddRequest, EmployeeUpdateRequest } from '../types/employee.types';

  export const employeeService = {
    async getEmployees(params?: EmployeeListParams, options?: { signal?: AbortSignal }): Promise<EmployeeListResponse> {
      const data: any = await apiClient.post(API_ENDPOINTS.EMPLOYEES, params, { signal: options?.signal });
      return data.data ?? data;
    },

    async getEmployeeById(id: number): Promise<Employee> {
      const data: any = await apiClient.get(API_ENDPOINTS.EMPLOYEE_BY_ID(id));
      return data.data ?? data;
    },

    async createEmployee(formData: EmployeeAddRequest): Promise<Employee> {
      const data: any = await apiClient.post(API_ENDPOINTS.CREATE_EMPLOYEE, formData);
      return data.data ?? data;
    },

    async updateEmployeeStatus(id: number, formData: EmployeeUpdateRequest): Promise<Employee> {
      const data: any = await apiClient.put(API_ENDPOINTS.EMPLOYEE_BY_ID(id), formData);
      return data.data ?? data;
    },
  };
