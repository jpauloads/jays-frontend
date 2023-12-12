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
  
  export const phoneMask = (value: string): string => {
    return value
        .replace(/\D/g, '') // Remove tudo que não é dígito
        .replace(/^(\d{2})(\d)/g, '($1)$2') // Insere o parênteses após os dois primeiros dígitos
        .replace(/(\d)(\d{4})(\d{4})$/, '$1$2-$3'); // Insere o hífen após o sétimo dígito
  }
  export function priceMask(value: string): string {
    let v = value.replace(/\D/g, '');
    v = (parseInt(v) / 100).toFixed(2);
    v = "R$ " + v.replace(".", ",");
    return v;
  }
  export function meiMask(value: string): string {
    return value
      .replace(/\D/g, '') // Remove tudo que não é dígito
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1'); // Captura 2 dígitos após o - e não deixa digitar mais nada
  }
  
  export function cnpjMask(value: string): string {
    return value
      .replace(/\D/g, '') // Remove tudo que não é dígito
      .replace(/(\d{2})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1-$2')
      .replace(/(-\d{2})\d+?$/, '$1'); // Captura 2 dígitos após o - e não deixa digitar mais nada
  }