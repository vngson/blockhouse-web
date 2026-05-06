import { create } from 'zustand';
  import { Employee, EmployeeListParams } from '../types/employee.types';
  import { employeeService } from '../services/employeeService';

  interface EmployeeState {
    employees: Employee[];
    selectedEmployee: Employee | null;
    totalEmployees: number;
    isLoading: boolean;
    error: string | null;
    fetchEmployees: (params?: EmployeeListParams) => Promise<void>;
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

    fetchEmployees: async (params) => {
      set({ isLoading: true, error: null });
      try {
        const res = await employeeService.getEmployees(params);
        set({ employees: res.employees ?? [], totalEmployees: res.total_employees ?? 0 });
      } catch (err: any) {
        set({ error: err.message || 'Failed to fetch employees' });
      } finally {
        set({ isLoading: false });
      }
    },

    createEmployee: async (data) => {
      set({ isLoading: true, error: null });
      try {
        await employeeService.createEmployee(data);
      } catch (err: any) {
        set({ error: err.message || 'Failed to create employee' });
      } finally {
        set({ isLoading: false });
      }
    },

    toggleStatus: async (id, status) => {
      set({ error: null });
      try {
        await employeeService.updateEmployeeStatus(id, { status });
      } catch (err: any) {
        set({ error: err.message || 'Failed to update status' });
      }
    },

    setSelectedEmployee: (employee) => set({ selectedEmployee: employee }),
    clearError: () => set({ error: null }),
  }));