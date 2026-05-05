 export function isNotEmpty(value: string | null | undefined): boolean {
    return value != null && value.trim().length > 0;
  }

  export function isValidPhone(phone: string): boolean {
    const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
    return phoneRegex.test(phone);
  }

  export function isValidPrice(price: number): boolean {
    return price >= 0;
  }