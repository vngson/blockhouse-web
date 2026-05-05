 export function formatCurrency(amount: number | null | undefined): string {
    if (amount == null) return '0 ₫';
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(amount);
  }