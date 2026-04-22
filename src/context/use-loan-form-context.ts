import { useContext } from 'react';
import { LoanFormContext } from './loan-form-context.ts';
import type { LoanFormContextValue } from './loan-form-context.ts';

export const useLoanFormContext = (): LoanFormContextValue => {
  const context = useContext(LoanFormContext);

  if (!context) {
    throw new Error('useLoanFormContext должен использоваться внутри LoanFormProvider');
  }

  return context;
};
