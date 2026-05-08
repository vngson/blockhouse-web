import { useState, useEffect, useCallback } from 'react';
import apiClient from '../api/client';
import { API_ENDPOINTS } from '../api/endpoints';

interface HealthStatus {
  isHealthy: boolean | null;
  lastChecked: Date | null;
  check: () => Promise<boolean>;
}

export function useHealthCheck(intervalMs?: number): HealthStatus {
  const [isHealthy, setIsHealthy] = useState<boolean | null>(null);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const check = useCallback(async (): Promise<boolean> => {
    try {
      await apiClient.get(API_ENDPOINTS.HEALTH, { timeout: 5000 });
      setIsHealthy(true);
      setLastChecked(new Date());
      return true;
    } catch {
      setIsHealthy(false);
      setLastChecked(new Date());
      return false;
    }
  }, []);

  useEffect(() => {
    if (!intervalMs) return;
    check();
    const id = setInterval(check, intervalMs);
    return () => clearInterval(id);
  }, [intervalMs, check]);

  return { isHealthy, lastChecked, check };
}
