export function maskCPF (value: string | undefined): string {
  if (!value) {
    return ''
  }
  return value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    .slice(0, 14)
}

export function unmaskCPF (cpf: string): string {
  return cpf.replace(/\D/g, '')
}

export function maskPhone (value: string | undefined): string {
  if (!value) {
    return ''
  }
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .slice(0, 15)
}

export function maskEmail (value: string | undefined): string {
  if (!value) {
    return ''
  }
  return value
    .toLowerCase()
    .replace(/[^\w@.\-]/g, '')
}

export function unmaskCellphone (cell: string): string {
  return cell.replace(/\D/g, '')
}
