import { z } from 'zod';

export const orderFormSchema = z.object({
  datetime: z.string().min(1, 'Chọn thời gian'),
  employee_id: z.number({ required_error: 'Chọn nhân viên' }).min(1, 'Chọn nhân viên'),
  services: z.array(
    z.object({
      service_id: z.number({ required_error: 'Chọn dịch vụ' }).min(1, 'Chọn dịch vụ'),
      quantity: z.number({ required_error: 'Nhập số lượng' }).min(1, 'Số lượng >= 1'),
    })
  ).min(1, 'Chọn ít nhất 1 dịch vụ'),
});

export type OrderFormValues = z.infer<typeof orderFormSchema>;
