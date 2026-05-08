import '@testing-library/jest-dom';
import apiClient from '@blockhouse/shared-lib/api/client';
import { API_ENDPOINTS } from '@blockhouse/shared-lib/api/endpoints';
import { employeeService } from './employeeService';

jest.mock('@blockhouse/shared-lib/api/client');
const mockedClient = apiClient as jest.Mocked<typeof apiClient>;

describe('employeeService', () => {
  beforeEach(() => jest.clearAllMocks());

  it('getEmployees calls POST with params', async () => {
    mockedClient.post.mockResolvedValueOnce({ data: { data: { employees: [], total_employees: 0 } } } as any);
    await employeeService.getEmployees({ page: 1 });
    expect(mockedClient.post).toHaveBeenCalledWith(API_ENDPOINTS.EMPLOYEES, { page: 1 }, { signal: undefined });
  });

  it('getEmployeeById calls GET with correct endpoint', async () => {
    mockedClient.get.mockResolvedValueOnce({ data: { data: { id: 1, name: 'Test' } } } as any);
    await employeeService.getEmployeeById(1);
    expect(mockedClient.get).toHaveBeenCalledWith(API_ENDPOINTS.EMPLOYEE_BY_ID(1));
  });

  it('createEmployee calls POST to create endpoint', async () => {
    mockedClient.post.mockResolvedValueOnce({ data: { data: { id: 1, name: 'New' } } } as any);
    await employeeService.createEmployee({ name: 'New', phone: '0912345678' });
    expect(mockedClient.post).toHaveBeenCalledWith(API_ENDPOINTS.CREATE_EMPLOYEE, { name: 'New', phone: '0912345678' });
  });

  it('updateEmployeeStatus calls PUT', async () => {
    mockedClient.put.mockResolvedValueOnce({ data: { data: { id: 1, status: 0 } } } as any);
    await employeeService.updateEmployeeStatus(1, { status: 0 });
    expect(mockedClient.put).toHaveBeenCalledWith(API_ENDPOINTS.EMPLOYEE_BY_ID(1), { status: 0 });
  });
});
