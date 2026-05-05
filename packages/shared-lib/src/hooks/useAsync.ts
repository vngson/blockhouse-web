import { useState, useCallback } from 'react';

  interface AsyncState<T> {
    data: T | null;
    isLoading: boolean;
    error: string | null;
  }

  export function useAsync<T>() {
    const [state, setState] = useState<AsyncState<T>>({
      data: null,
      isLoading: false,
      error: null,
    });

    const execute = useCallback(async (asyncFn: () => Promise<T>) => {
      setState({ data: null, isLoading: true, error: null });
      try {
        const data = await asyncFn();
        setState({ data, isLoading: false, error: null });
        return data;
      } catch (error) {
        const message = (error as Error).message;
        setState({ data: null, isLoading: false, error: message });
        throw error;
      }
    }, []);

    const reset = useCallback(() => {
      setState({ data: null, isLoading: false, error: null });
    }, []);

    return { ...state, execute, reset };
  }