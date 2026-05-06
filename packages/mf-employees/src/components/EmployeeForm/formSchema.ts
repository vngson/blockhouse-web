import { z } from 'zod';

  export const employeeAddSchema = z.object({
    name: z.string().min(1, 'Tên không được để trống').max(100, 'Tên quá dài'),
    phone: z.string().min(9, 'SĐT ít nhất 9 số').max(15, 'SĐT quá dài'),
  });

  export type EmployeeAddFormData = z.infer<typeof employeeAddSchema>;