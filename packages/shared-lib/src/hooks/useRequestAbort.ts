import { useRef, useCallback } from 'react';

export function useRequestAbort() {
  const controllerRef = useRef<AbortController | null>(null);

  const getSignal = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    return controllerRef.current.signal;
  }, []);

  const abort = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = null;
  }, []);

  return { getSignal, abort };
}
