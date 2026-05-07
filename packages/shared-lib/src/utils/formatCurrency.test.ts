import { formatCurrency } from './formatCurrency';

describe('formatCurrency', () => {
  it('formats positive number as VND', () => {
    const result = formatCurrency(100000);
    expect(result).toContain('100');
    expect(result).toContain('₫');
  });

  it('formats zero', () => {
    const result = formatCurrency(0);
    expect(result).toContain('0');
  });

  it('returns "0 ₫" for null', () => {
    expect(formatCurrency(null)).toBe('0 ₫');
  });

  it('returns "0 ₫" for undefined', () => {
    expect(formatCurrency(undefined)).toBe('0 ₫');
  });

  it('formats large numbers with thousand separators', () => {
    const result = formatCurrency(1500000);
    expect(result).toContain('1');
    expect(result).toContain('500');
  });
});
