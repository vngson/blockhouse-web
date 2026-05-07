import '@testing-library/jest-dom';
import apiClient from '@blockhouse/shared-lib/api/client';
import { API_ENDPOINTS } from '@blockhouse/shared-lib/api/endpoints';
import { serviceService } from './serviceService';

jest.mock('@blockhouse/shared-lib/api/client');
const mockedClient = apiClient as jest.Mocked<typeof apiClient>;

describe('serviceService', () => {
  beforeEach(() => jest.clearAllMocks());

  it('getServices calls GET with params', async () => {
    const mockResponse = { services: [], total: 0, page: 1, page_size: 10 };
    mockedClient.get.mockResolvedValueOnce({ data: { data: mockResponse } } as any);
    await serviceService.getServices({ page: 1 });
    expect(mockedClient.get).toHaveBeenCalledWith(API_ENDPOINTS.SERVICES, { data: { page: 1 } });
  });

  it('getAllServices calls GET on all endpoint', async () => {
    mockedClient.get.mockResolvedValueOnce({ data: { data: [] } } as any);
    await serviceService.getAllServices();
    expect(mockedClient.get).toHaveBeenCalledWith(API_ENDPOINTS.SERVICES_ALL);
  });

  it('createService calls POST', async () => {
    mockedClient.post.mockResolvedValueOnce({ data: { data: { id: 1, name: 'Test', description: '', price: 50000 } } } as any);
    await serviceService.createService({ name: 'Test', description: '', price: 50000 });
    expect(mockedClient.post).toHaveBeenCalledWith(API_ENDPOINTS.SERVICES, { name: 'Test', description: '', price: 50000 });
  });

  it('updateService calls PUT with correct id', async () => {
    mockedClient.put.mockResolvedValueOnce({ data: { data: { id: 1, name: 'Updated', description: '', price: 60000 } } } as any);
    await serviceService.updateService(1, { name: 'Updated', description: '', price: 60000 });
    expect(mockedClient.put).toHaveBeenCalledWith(API_ENDPOINTS.SERVICE_BY_ID(1), { name: 'Updated', description: '', price: 60000 });
  });
});
