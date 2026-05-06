export interface Service {
    id: number;
    name: string;
    description: string;
    price: number;
  }

  export interface ServiceListParams {
    page?: number;
    page_size?: number;
    keyword?: string;
  }

  export interface ServiceListResponse {
    services: Service[];
    page: number;
    page_size: number;
    total_services: number;
  }

  export interface ServiceFormData {
    name: string;
    description: string;
    price: number;
  }