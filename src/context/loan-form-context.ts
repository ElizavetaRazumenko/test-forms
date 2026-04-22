import { createContext } from 'react';
import type { LoanFormValues } from '../types/form.ts';

export type LoanFormContextValue = {
  formValues: LoanFormValues;
  updateFormValues: (payload: Partial<LoanFormValues>) => void;
  workPlaces: string[];
  isWorkPlacesLoading: boolean;
  workPlacesError: string;
  loadWorkPlaces: () => Promise<void>;
  isSubmitting: boolean;
  submitError: string;
  submit: (payload?: Partial<LoanFormValues>) => Promise<boolean>;
  isResultModalOpen: boolean;
  closeResultModal: () => void;
};

export const LoanFormContext = createContext<LoanFormContextValue | null>(null);
