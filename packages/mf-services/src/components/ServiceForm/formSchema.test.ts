import { serviceFormSchema } from './formSchema';

describe('serviceFormSchema', () => {
  it('passes for valid data', () => {
    const result = serviceFormSchema.safeParse({ name: 'Cắt tóc', description: 'Cắt tóc nam', price: 50000 });
    expect(result.success).toBe(true);
  });

  it('fails for empty name', () => {
    const result = serviceFormSchema.safeParse({ name: '', description: 'desc', price: 50000 });
    expect(result.success).toBe(false);
  });

  it('fails for empty description', () => {
    const result = serviceFormSchema.safeParse({ name: 'Test', description: '', price: 50000 });
    expect(result.success).toBe(false);
  });

  it('fails for price below 1000', () => {
    const result = serviceFormSchema.safeParse({ name: 'Test', description: 'desc', price: 500 });
    expect(result.success).toBe(false);
  });

  it('passes for price exactly 1000', () => {
    const result = serviceFormSchema.safeParse({ name: 'Test', description: 'desc', price: 1000 });
    expect(result.success).toBe(true);
  });
});
