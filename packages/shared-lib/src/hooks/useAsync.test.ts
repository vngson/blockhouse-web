import '@testing-library/jest-dom';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useAsync } from './useAsync';

describe('useAsync', () => {
  it('has correct initial state', () => {
    const { result } = renderHook(() => useAsync<string>());
    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets data on success', async () => {
    const { result } = renderHook(() => useAsync<string>());

    await act(async () => {
      await result.current.execute(async () => 'hello');
    });

    expect(result.current.data).toBe('hello');
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets error on failure', async () => {
    const { result } = renderHook(() => useAsync<string>());

    await act(async () => {
      try {
        await result.current.execute(async () => {
          throw new Error('Something failed');
        });
      } catch {}
    });

    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Something failed');
  });

  it('reset returns to initial state', async () => {
    const { result } = renderHook(() => useAsync<string>());

    await act(async () => {
      await result.current.execute(async () => 'data');
    });
    expect(result.current.data).toBe('data');

    act(() => result.current.reset());
    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });
});
