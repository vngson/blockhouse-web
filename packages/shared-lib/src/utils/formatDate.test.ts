import { formatDate, formatDateTime } from './formatDate';

describe('formatDate', () => {
  it('formats ISO date string to Vietnamese format', () => {
    const result = formatDate('2024-01-15');
    expect(result).toContain('15');
    expect(result).toContain('01');
    expect(result).toContain('2024');
  });

  it('formats date with time component', () => {
    const result = formatDate('2024-06-20T14:30:00');
    expect(result).toContain('20');
    expect(result).toContain('06');
  });
});

describe('formatDateTime', () => {
  it('formats ISO datetime string with date and time', () => {
    const result = formatDateTime('2024-01-15T14:30:00');
    expect(result).toContain('15');
    expect(result).toContain('01');
    expect(result).toContain('2024');
    expect(result).toContain('14');
    expect(result).toContain('30');
  });
});
