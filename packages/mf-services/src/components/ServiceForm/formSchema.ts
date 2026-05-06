import { z } from 'zod';

  export const serviceFormSchema = z.object({
    name: z.string().min(1, 'Tên không được để trống').max(100, 'Tên quá dài'),
    description: z.string().min(1, 'Mô tả không được để trống'),
    price: z.coerce.number().min(1000, 'Giá phải lớn hơn 1,000đ'),
  });

  export type ServiceFormValues = z.infer<typeof serviceFormSchema>;