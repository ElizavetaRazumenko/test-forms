import type { LoanFormValues } from '../types/form.ts';

export const FormField = {
  Phone: 'phone',
  FirstName: 'firstName',
  LastName: 'lastName',
  Gender: 'gender',
  WorkPlace: 'workPlace',
  Address: 'address',
  LoanAmount: 'loanAmount',
  LoanTerm: 'loanTerm',
} as const;

export const ROUTES = {
  personalData: '/',
  addressWork: '/address-work',
  loanParams: '/loan-params',
} as const;

export const DEFAULT_FORM_VALUES: LoanFormValues = {
  phone: '',
  firstName: '',
  lastName: '',
  gender: '',
  workPlace: '',
  address: '',
  loanAmount: 200,
  loanTerm: 10,
};

export const LOAN_AMOUNT = {
  min: 200,
  max: 1000,
  step: 100,
} as const;

export const LOAN_TERM = {
  min: 10,
  max: 30,
  step: 1,
} as const;

export const GENDER_OPTIONS = [
  { value: 'male', label: 'Мужской' },
  { value: 'female', label: 'Женский' },
] as const;
