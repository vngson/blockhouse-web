import { isNotEmpty, isValidPhone, isValidPrice } from './validators';

describe('isNotEmpty', () => {
  it('returns true for non-empty string', () => {
    expect(isNotEmpty('hello')).toBe(true);
  });

  it('returns false for empty string', () => {
    expect(isNotEmpty('')).toBe(false);
  });

  it('returns false for null', () => {
    expect(isNotEmpty(null)).toBe(false);
  });

  it('returns false for undefined', () => {
    expect(isNotEmpty(undefined)).toBe(false);
  });

  it('returns false for whitespace-only string', () => {
    expect(isNotEmpty('   ')).toBe(false);
  });
});

describe('isValidPhone', () => {
  it('returns true for valid phone number starting with 09', () => {
    expect(isValidPhone('0912345678')).toBe(true);
  });

  it('returns true for valid phone number starting with 03', () => {
    expect(isValidPhone('0312345678')).toBe(true);
  });

  it('returns true for valid phone number starting with 05', () => {
    expect(isValidPhone('0512345678')).toBe(true);
  });

  it('returns false for phone starting with 01', () => {
    expect(isValidPhone('0123456789')).toBe(false);
  });

  it('returns false for too short number', () => {
    expect(isValidPhone('0912345')).toBe(false);
  });

  it('returns false for non-numeric input', () => {
    expect(isValidPhone('abcdefghij')).toBe(false);
  });
});

describe('isValidPrice', () => {
  it('returns true for positive price', () => {
    expect(isValidPrice(50000)).toBe(true);
  });

  it('returns true for zero', () => {
    expect(isValidPrice(0)).toBe(true);
  });

  it('returns false for negative price', () => {
    expect(isValidPrice(-1)).toBe(false);
  });
});
