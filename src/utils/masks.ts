export function cpfMask(value: string): string {
    return value
      .replace(/\D/g, '') // Remove tudo que não é dígito
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
  
  export function zipCodeMask(value: string): string {
    return value
      .replace(/\D/g, '')  // Remove tudo que não é dígito
      .replace(/(\d{5})(\d)/, '$1-$2');
  }
  