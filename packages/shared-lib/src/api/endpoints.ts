export const API_ENDPOINTS = {
    DASHBOARD: '/api/v1/dashboard',

    EMPLOYEES: '/api/v1/employees',
    EMPLOYEE_BY_ID: (id: number) => `/api/v1/employees/${id}`,
    CREATE_EMPLOYEE: '/api/v1/employees/create_employee',

    ORDERS: '/api/v1/orders',
    ORDERS_BY_DATE: '/api/v1/orders/by_date',
    ORDERS_BY_EMPLOYEE: '/api/v1/orders/revenue_by_employee',
    ORDER_BY_ID: (id: number) => `/api/v1/orders/${id}`,
    ORDER_FOR_ONE_DATE: '/api/v1/orders/for_one_date',
    ORDER_BY_DATE_AND_EMPLOYEE: '/api/v1/orders/by_date_and_employee',
    REVENUE_MONTHLY_BY_EMPLOYEE: '/api/v1/orders/revenue_monthly_by_employee',
    CREATE_ORDER: '/api/v1/orders/create',

    SERVICES: '/api/v1/service',
    SERVICES_ALL: '/api/v1/service/all',
    SERVICE_BY_ID: (id: number) => `/api/v1/service/${id}`,

    HEALTH: '/api/v1/health',
  } as const;