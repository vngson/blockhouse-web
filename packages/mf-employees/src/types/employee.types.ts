export interface Employee {
    id: number;
    name: string;
    phone: string;
    status: EmployeeStatus;
    income: number | null;
    created_at: string;
    updated_at: string;
  }

  export enum EmployeeStatus {
    INACTIVE = 0,
    ACTIVE = 1,
  }

  export interface EmployeeListParams {
    page?: number;
    page_size?: number;
    date_from?: string;
    date_to?: string;
    keyword?: string;
  }

  export interface EmployeeListResponse {
    employees: Employee[];
    page: number;
    page_size: number;
    total_employees: number;
  }

  export interface EmployeeAddRequest {
    name: string;
    phone: string;
  }

  export interface EmployeeUpdateRequest {
    status: EmployeeStatus;
  }