export interface ApiResponse<T> {
    data: T;
    message: string;
    status: number;
  }

  export interface PaginatedResponse<T> {
    items: T[];
    page: number;
    page_size: number;
    total: number;
  }