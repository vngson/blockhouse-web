import { useState, useCallback } from 'react';

  interface PaginationState {
    page: number;
    pageSize: number;
  }

  export function usePagination(initialPageSize: number = 10) {
    const [pagination, setPagination] = useState<PaginationState>({
      page: 1,
      pageSize: initialPageSize,
    });

    const setPage = useCallback((page: number) => {
      setPagination((prev) => ({ ...prev, page }));
    }, []);

    const setPageSize = useCallback((pageSize: number) => {
      setPagination({ page: 1, pageSize });
    }, []);

    const resetPage = useCallback(() => {
      setPagination((prev) => ({ ...prev, page: 1 }));
    }, []);

    return {
      page: pagination.page,
      pageSize: pagination.pageSize,
      setPage,
      setPageSize,
      resetPage,
    };
  }