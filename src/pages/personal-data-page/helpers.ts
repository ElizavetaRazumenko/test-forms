export const formatPhoneNumber = (value: string): string => {
    const digitsOnly = value.replace(/\D/g, '').slice(0, 10);
  
    const part1 = digitsOnly.slice(0, 4);
    const part2 = digitsOnly.slice(4, 7);
    const part3 = digitsOnly.slice(7, 10);
  
    return [part1, part2, part3].filter(Boolean).join(' ');
  };