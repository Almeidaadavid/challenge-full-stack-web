import { unmaskCPF } from "./MaskUtils";

export const emailRules: Array<(value: any) => boolean | string> = [
  value => {
    if (value) return true

    return 'E-mail is required.'
  },
  value => {
    if (/.+@.+\..+/.test(value)) return true

    return 'E-mail must be valid.'
  },
];

export const nameRules: Array<(value: any) => boolean | string> = [
  value => {
    if (value) return true

    return 'Name is required.'
  }
];

export const passwordRules: Array<(value: any) => boolean | string> = [
  value => {
    if (value) return true

    return 'Password is required.'
  },
  value => {
    if (value.length > 6) return true;

    return 'Password must be at least 8 characters long.'
  }
];

export const documentRules: Array<(value: any) => boolean | string> = [
  value => {
    if (value) return true

    return 'Document is required.'
  },
  value => {
    const document = unmaskCPF(value);
    if (document.length === 11) return true;

    if (document.length !== 11) 
        return 'Invalid CPF. Must have 11 digits.';

    return 'Invalid document field.'
  }
];

export const studentRegistrationRules: Array<(value: any) => boolean | string> = [
    value => {
        if (value) return true

        return 'Student registration is required.'
    }
];
