export type Gender = 'male' | 'female';

export type LoanFormValues = {
  phone: string;
  firstName: string;
  lastName: string;
  gender: Gender | '';
  workPlace: string;
  address: string;
  loanAmount: number;
  loanTerm: number;
};
