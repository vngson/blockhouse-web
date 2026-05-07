import '@testing-library/jest-dom';
import { useServiceStore } from './serviceStore';
import { serviceService } from '../services/serviceService';

jest.mock('../services/serviceService');

describe('serviceStore', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    useServiceStore.setState({
      services: [], totalServices: 0, selectedService: null, isLoading: false, error: null,
    });
  });

  it('has correct initial state', () => {
    const state = useServiceStore.getState();
    expect(state.services).toEqual([]);
    expect(state.totalServices).toBe(0);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBeNull();
  });

  it('fetchServices sets data on success', async () => {
    const mockResponse = { services: [{ id: 1, name: 'Test', description: '', price: 50000 }], total_services: 1 };
    (serviceService.getServices as jest.Mock).mockResolvedValueOnce(mockResponse);
    await useServiceStore.getState().fetchServices();
    const state = useServiceStore.getState();
    expect(state.services).toHaveLength(1);
    expect(state.totalServices).toBe(1);
    expect(state.isLoading).toBe(false);
  });

  it('fetchServices sets error on failure', async () => {
    (serviceService.getServices as jest.Mock).mockRejectedValueOnce(new Error('Server error'));
    await useServiceStore.getState().fetchServices();
    expect(useServiceStore.getState().error).toBe('Server error');
  });

  it('createService delegates to service', async () => {
    (serviceService.createService as jest.Mock).mockResolvedValueOnce({});
    await useServiceStore.getState().createService({ name: 'New', description: 'Desc', price: 10000 });
    expect(serviceService.createService).toHaveBeenCalledWith({ name: 'New', description: 'Desc', price: 10000 });
  });

  it('setSelectedService updates state', () => {
    const service = { id: 1, name: 'Test', description: '', price: 50000 };
    useServiceStore.getState().setSelectedService(service as any);
    expect(useServiceStore.getState().selectedService).toEqual(service);
  });

  it('clearError clears error', () => {
    useServiceStore.setState({ error: 'Some error' });
    useServiceStore.getState().clearError();
    expect(useServiceStore.getState().error).toBeNull();
  });
});
