import '@testing-library/jest-dom';
import { useEmployeeStore } from './employeeStore';
import { employeeService } from '../services/employeeService';

jest.mock('../services/employeeService');

describe('employeeStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useEmployeeStore.setState({
      employees: [], selectedEmployee: null, totalEmployees: 0, isLoading: false, error: null,
    });
  });

  it('has correct initial state', () => {
    const state = useEmployeeStore.getState();
    expect(state.employees).toEqual([]);
    expect(state.totalEmployees).toBe(0);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('fetchEmployees sets data on success', async () => {
    (employeeService.getEmployees as jest.Mock).mockResolvedValueOnce({
      employees: [{ id: 1, name: 'Test', phone: '0909', status: 1, income: 0, created_at: '', updated_at: '' }],
      total_employees: 1,
    });
    await useEmployeeStore.getState().fetchEmployees();
    const state = useEmployeeStore.getState();
    expect(state.employees).toHaveLength(1);
    expect(state.totalEmployees).toBe(1);
    expect(state.isLoading).toBe(false);
  });

  it('fetchEmployees sets error on failure', async () => {
    (employeeService.getEmployees as jest.Mock).mockRejectedValueOnce(new Error('Network'));
    await useEmployeeStore.getState().fetchEmployees();
    expect(useEmployeeStore.getState().error).toBe('Network');
  });

  it('createEmployee delegates to service', async () => {
    (employeeService.createEmployee as jest.Mock).mockResolvedValueOnce({});
    await useEmployeeStore.getState().createEmployee({ name: 'New', phone: '0912345678' });
    expect(employeeService.createEmployee).toHaveBeenCalledWith({ name: 'New', phone: '0912345678' });
  });

  it('toggleStatus calls updateEmployeeStatus', async () => {
    (employeeService.updateEmployeeStatus as jest.Mock).mockResolvedValueOnce({});
    await useEmployeeStore.getState().toggleStatus(1, 0);
    expect(employeeService.updateEmployeeStatus).toHaveBeenCalledWith(1, { status: 0 });
  });

  it('setSelectedEmployee updates state', () => {
    useEmployeeStore.getState().setSelectedEmployee({ id: 1, name: 'Test' } as any);
    expect(useEmployeeStore.getState().selectedEmployee).toEqual({ id: 1, name: 'Test' });
  });

  it('clearError clears error', () => {
    useEmployeeStore.setState({ error: 'Error' });
    useEmployeeStore.getState().clearError();
    expect(useEmployeeStore.getState().error).toBeNull();
  });
});
