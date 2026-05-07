import { orderFormSchema } from './formSchema';

describe('orderFormSchema', () => {
  const validData = {
    datetime: '2024-01-15T10:30',
    employee_id: 1,
    services: [{ service_id: 1, quantity: 2 }],
  };

  it('passes for valid data', () => {
    const result = orderFormSchema.safeParse(validData);
    expect(result.success).toBe(true);
  });

  it('fails for empty datetime', () => {
    const result = orderFormSchema.safeParse({ ...validData, datetime: '' });
    expect(result.success).toBe(false);
  });

  it('fails for employee_id = 0', () => {
    const result = orderFormSchema.safeParse({ ...validData, employee_id: 0 });
    expect(result.success).toBe(false);
  });

  it('fails for empty services array', () => {
    const result = orderFormSchema.safeParse({ ...validData, services: [] });
    expect(result.success).toBe(false);
  });

  it('fails for service_id = 0', () => {
    const result = orderFormSchema.safeParse({ ...validData, services: [{ service_id: 0, quantity: 1 }] });
    expect(result.success).toBe(false);
  });

  it('fails for quantity < 1', () => {
    const result = orderFormSchema.safeParse({ ...validData, services: [{ service_id: 1, quantity: 0 }] });
    expect(result.success).toBe(false);
  });

  it('passes for quantity = 1', () => {
    const result = orderFormSchema.safeParse({ ...validData, services: [{ service_id: 1, quantity: 1 }] });
    expect(result.success).toBe(true);
  });
});
