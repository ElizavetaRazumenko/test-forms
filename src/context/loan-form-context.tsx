import { useCallback, useMemo, useState } from 'react';
import { submitLoanApplication } from '../api/application.ts';
import { fetchWorkPlaces } from '../api/categories.ts';
import { DEFAULT_FORM_VALUES } from '../constants/form.ts';
import {
  LoanFormContext,
  type LoanFormContextValue,
} from './loan-form-context.ts';
import type { LoanFormValues } from '../types/form.ts';

type Props = {
  children: React.ReactNode;
};

export const LoanFormProvider: React.FC<Props> = ({ children }) => {
  const [formValues, setFormValues] = useState<LoanFormValues>(DEFAULT_FORM_VALUES);
  const [workPlaces, setWorkPlaces] = useState<string[]>([]);
  const [isWorkPlacesLoading, setIsWorkPlacesLoading] = useState(false);
  const [workPlacesError, setWorkPlacesError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);

  const updateFormValues = useCallback((payload: Partial<LoanFormValues>) => {
    setFormValues((prevValues) => ({
      ...prevValues,
      ...payload,
    }));
  }, []);

  const loadWorkPlaces = useCallback(async () => {
    if (workPlaces.length > 0) {
      return;
    }

    setIsWorkPlacesLoading(true);
    setWorkPlacesError('');

    try {
      const categories = await fetchWorkPlaces();
      setWorkPlaces(categories);
    } catch (error) {
      setWorkPlacesError(
        error instanceof Error ? error.message : 'Не удалось загрузить список мест работы',
      );
    } finally {
      setIsWorkPlacesLoading(false);
    }
  }, [workPlaces.length]);

  const submit = useCallback(async (payload?: Partial<LoanFormValues>) => {
    const nextValues = {
      ...formValues,
      ...payload,
    };

    if (payload) {
      setFormValues(nextValues);
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      await submitLoanApplication({
        firstName: nextValues.firstName,
        lastName: nextValues.lastName,
      });
      setIsResultModalOpen(true);
      return true;
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : 'Не удалось отправить заявку',
      );
      return false;
    } finally {
      setIsSubmitting(false);
    }
  }, [formValues]);

  const closeResultModal = useCallback(() => {
    setIsResultModalOpen(false);
  }, []);

  const contextValue = useMemo<LoanFormContextValue>(
    () => ({
      formValues,
      updateFormValues,
      workPlaces,
      isWorkPlacesLoading,
      workPlacesError,
      loadWorkPlaces,
      isSubmitting,
      submitError,
      submit,
      isResultModalOpen,
      closeResultModal,
    }),
    [
      closeResultModal,
      formValues,
      isResultModalOpen,
      isSubmitting,
      isWorkPlacesLoading,
      loadWorkPlaces,
      submit,
      submitError,
      updateFormValues,
      workPlaces,
      workPlacesError,
    ],
  );

  return (
    <LoanFormContext.Provider value={contextValue}>
      {children}
    </LoanFormContext.Provider>
  );
};
