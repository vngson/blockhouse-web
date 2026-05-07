import { renderHook, act } from '@testing-library/react';
import { usePagination } from './usePagination';

describe('usePagination', () => {
  it('has default page 1 and pageSize 10', () => {
    const { result } = renderHook(() => usePagination());
    expect(result.current.page).toBe(1);
    expect(result.current.pageSize).toBe(10);
  });

  it('accepts custom initialPageSize', () => {
    const { result } = renderHook(() => usePagination(25));
    expect(result.current.pageSize).toBe(25);
  });

  it('setPage updates page', () => {
    const { result } = renderHook(() => usePagination());
    act(() => result.current.setPage(3));
    expect(result.current.page).toBe(3);
  });

  it('setPageSize resets page to 1', () => {
    const { result } = renderHook(() => usePagination());
    act(() => result.current.setPage(5));
    expect(result.current.page).toBe(5);
    act(() => result.current.setPageSize(20));
    expect(result.current.page).toBe(1);
    expect(result.current.pageSize).toBe(20);
  });

  it('resetPage sets page back to 1', () => {
    const { result } = renderHook(() => usePagination());
    act(() => result.current.setPage(7));
    act(() => result.current.resetPage());
    expect(result.current.page).toBe(1);
  });
});
