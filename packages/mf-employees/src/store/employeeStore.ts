import { create } from 'zustand';
import axios from 'axios';
import { Employee, EmployeeListParams } from '../types/employee.types';
import { employeeService } from '../services/employeeService';

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Lỗi không xác định';
}

interface EmployeeState {
  employees: Employee[];
  selectedEmployee: Employee | null;
  totalEmployees: number;
  isLoading: boolean;
  error: string | null;
  fetchEmployees: (params?: EmployeeListParams, options?: { signal?: AbortSignal }) => Promise<void>;
  createEmployee: (data: { name: string; phone: string }) => Promise<void>;
  toggleStatus: (id: number, status: Employee['status']) => Promise<void>;
  setSelectedEmployee: (employee: Employee | null) => void;
  clearError: () => void;
}

export const useEmployeeStore = create<EmployeeState>((set) => ({
  employees: [],
  selectedEmployee: null,
  totalEmployees: 0,
  isLoading: false,
  error: null,

  fetchEmployees: async (params, options) => {
    set({ isLoading: true, error: null });
    try {
      const res = await employeeService.getEmployees(params, options);
      set({ employees: res.employees ?? [], totalEmployees: res.total_employees ?? 0 });
    } catch (error: unknown) {
      if (axios.isCancel(error)) return;
      set({ error: getErrorMessage(error) });
    } finally {
      set({ isLoading: false });
    }
  },

  createEmployee: async (data) => {
    set({ isLoading: true, error: null });
    try {
      await employeeService.createEmployee(data);
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      set({ error: message, isLoading: false });
      throw new Error(message);
    }
    set({ isLoading: false });
  },

  toggleStatus: async (id, status) => {
    set({ error: null });
    try {
      await employeeService.updateEmployeeStatus(id, { status });
    } catch (error: unknown) {
      const message = getErrorMessage(error);
      set({ error: message });
      throw new Error(message);
    }
  },

  setSelectedEmployee: (employee) => set({ selectedEmployee: employee }),
  clearError: () => set({ error: null }),
}));
