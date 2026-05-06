import apiClient from '@blockhouse/shared-lib/api/client';
  import { API_ENDPOINTS } from '@blockhouse/shared-lib/api/endpoints';
  import { Employee, EmployeeListParams, EmployeeListResponse, EmployeeAddRequest, EmployeeUpdateRequest } from '../types/employee.types';

  export const employeeService = {
    async getEmployees(params?: EmployeeListParams): Promise<EmployeeListResponse> {
      const response = await apiClient.post<{ data: EmployeeListResponse }>(API_ENDPOINTS.EMPLOYEES, params);
      return response.data.data ?? response.data;
    },

    async getEmployeeById(id: number): Promise<Employee> {
      const response = await apiClient.get<{ data: Employee }>(API_ENDPOINTS.EMPLOYEE_BY_ID(id));
      return response.data.data ?? response.data;
    },

    async createEmployee(data: EmployeeAddRequest): Promise<Employee> {
      const response = await apiClient.post<{ data: Employee }>(API_ENDPOINTS.CREATE_EMPLOYEE, data);
      return response.data.data ?? response.data;
    },

    async updateEmployeeStatus(id: number, data: EmployeeUpdateRequest): Promise<Employee> {
      const response = await apiClient.put<{ data: Employee }>(API_ENDPOINTS.EMPLOYEE_BY_ID(id), data);
      return response.data.data ?? response.data;
    },
  };