export interface OrderService {
    service_id: number;
    quantity: number;
    name?: string;
  }

  export interface Order {
    id: number;
    datetime: string;
    employee_id: number | null;
    employee_name?: string;
    promotion_id: number | null;
    total: number | null;
    services: OrderService[];
  }

  export interface OrderListParams {
    page?: number;
    page_size?: number;
    date_from?: string;
    date_to?: string;
    keyword?: string;
    employee_id?: number;
  }

  export interface OrderListResponse {
    orders: Order[];
    page: number;
    page_size: number;
    total_orders: number;
  }

  export interface OrderByDate {
    date: string;
    total: number;
    employee_id: number | null;
    promotion_id: number | null;
    services: OrderService[];
  }

  export interface OrdersByDateResponse {
    orders_by_date: OrderByDate[];
    page: number;
    page_size: number;
    total_days: number;
  }

  export interface OrderByEmployeeAndDate {
    date: string;
    employee_id: number;
    employee_name: string;
    total: number;
    services: OrderService[];
  }

  export interface OrdersByEmployeeAndDateResponse {
    revenue_by_employee: OrderByEmployeeAndDate[];
    page: number;
    page_size: number;
    total_date_employees: number;
  }

  export interface CreateOrderRequest {
    datetime: string;
    employee_id: number;
    total: number;
    services: { service_id: number; quantity: number }[];
  }

  export interface ServiceLineItem {
    service_id: number | null;
    quantity: number;
  }

export interface MonthlyRevenueRecord {
    employee_id: number;
    employee_name: string;
    month: number;
    year: number;
    order_count: number;
    total: number;
    services: OrderService[];
  }

export interface MonthlyRevenueResponse {
    revenue_monthly_by_employee: MonthlyRevenueRecord[];
    page: number;
    page_size: number;
    total_records: number;
  }