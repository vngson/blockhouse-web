export interface EmployeeRevenue {
    id: number;
    name: string;
    revenue: number;
    order_count: number;
  }

  export interface MonthlyRevenue {
    month: number;
    revenue: number;
    quantity: number;
  }

  export interface ServiceRevenue {
    service_id: number;
    service_name: string;
    monthly_data: MonthlyRevenue[];
  }

  export interface DashboardData {
    top_employees: EmployeeRevenue[];
    total_revenue: number;
    total_service_sales: number;
    growth_percent: number;
    monthly_chart: ServiceRevenue[];
  }

  export interface DashboardParams {
    month?: number;
    year?: number;
  }