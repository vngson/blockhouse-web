import { lazy, ComponentType } from 'react';

interface RemoteLoadOptions {
  retries?: number;
  retryDelay?: number;
}

/**
 * Wraps React.lazy() with automatic retry on failure.
 *
 * @example
 * const Dashboard = lazyLoadRemote(() => import('mf_dashboard/Dashboard'));
 */
export function lazyLoadRemote<T extends ComponentType<any>>(
  importFn: () => Promise<{ default: T }>,
  options: RemoteLoadOptions = {}
): React.LazyExoticComponent<T> {
  const { retries = 2, retryDelay = 1000 } = options;

  const loadWithRetry = async (attempt = 0): Promise<{ default: T }> => {
    try {
      return await importFn();
    } catch (error) {
      if (attempt < retries) {
        console.warn(
          `Remote load failed (attempt ${attempt + 1}/${retries + 1}), retrying...`
        );
        await new Promise((resolve) => setTimeout(resolve, retryDelay));
        return loadWithRetry(attempt + 1);
      }
      throw error;
    }
  };

  return lazy(() => loadWithRetry());
}
