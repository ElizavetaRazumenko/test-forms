import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormField, LOAN_AMOUNT, LOAN_TERM, ROUTES } from '../../constants/form.ts';
import { useLoanFormContext } from '../../context/use-loan-form-context.ts';
import { loanParamsSchema } from '../../schema/form.ts';
import { FormInput } from '../../components/form-input/FormInput.tsx';
import { StepLayout } from '../../components/step-layout/StepLayout.tsx';
import type { LoanParamsValues } from './types.ts';
import { hasAddressAndWork } from './helpers.ts';

export const LoanParamsPage: React.FC = () => {
  const navigate = useNavigate();
  const { formValues, updateFormValues, submit, isSubmitting, submitError } =
    useLoanFormContext();

  useEffect(() => {
    if (!hasAddressAndWork(formValues)) {
      navigate(ROUTES.personalData, { replace: true });
    }
  }, [formValues, navigate]);

  const {
    control,
    getValues,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoanParamsValues>({
    resolver: zodResolver(loanParamsSchema),
    mode: 'onChange',
    defaultValues: {
      loanAmount: formValues.loanAmount,
      loanTerm: formValues.loanTerm,
    },
  });

  const watchedAmount = useWatch({
    control,
    name: FormField.LoanAmount,
  });
  const watchedTerm = useWatch({
    control,
    name: FormField.LoanTerm,
  });

  const onSubmit = async (values: LoanParamsValues) => {
    await submit(values);
  };

  const handleBack = () => {
    updateFormValues(getValues());
    navigate(ROUTES.addressWork);
  };

  return (
    <StepLayout title="Параметры займа" step={3} totalSteps={3}>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <FormInput
          type="range"
          label={`Сумма займа: ${watchedAmount}$`}
          min={LOAN_AMOUNT.min}
          max={LOAN_AMOUNT.max}
          step={LOAN_AMOUNT.step}
          error={errors.loanAmount?.message}
          {...register(FormField.LoanAmount, { valueAsNumber: true })}
        />

        <FormInput
          type="range"
          label={`Срок займа: ${watchedTerm} дней`}
          min={LOAN_TERM.min}
          max={LOAN_TERM.max}
          step={LOAN_TERM.step}
          error={errors.loanTerm?.message}
          {...register(FormField.LoanTerm, { valueAsNumber: true })}
        />

        {submitError ? <p className="error">{submitError}</p> : null}

        <div className="form-actions">
          <button type="button" className="button button--ghost" onClick={handleBack}>
            Назад
          </button>
          <button
            type="submit"
            className="button button--primary"
            disabled={!isValid || isSubmitting}
          >
            {isSubmitting ? 'Отправка...' : 'Подать заявку'}
          </button>
        </div>
      </form>
    </StepLayout>
  );
};
