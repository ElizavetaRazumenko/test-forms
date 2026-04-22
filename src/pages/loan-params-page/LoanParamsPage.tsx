import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormField, LOAN_AMOUNT, LOAN_TERM, ROUTES } from '../../constants/form.ts';
import { useLoanFormContext } from '../../context/use-loan-form-context.ts';
import { loanParamsSchema } from '../../schema/form.ts';
import { StepLayout } from '../../components/step-layout/StepLayout.tsx';
import type { LoanParamsValues } from './types.ts';
import { hasAddressAndWork } from './helpers.ts';

export const LoanParamsPage: React.FC = () => {
  const navigate = useNavigate();
  const { formValues, submit, isSubmitting, submitError } = useLoanFormContext();

  useEffect(() => {
    if (!hasAddressAndWork(formValues)) {
      navigate(ROUTES.personalData, { replace: true });
    }
  }, [formValues, navigate]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoanParamsValues>({
    resolver: zodResolver(loanParamsSchema),
    mode: 'onTouched',
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
    navigate(ROUTES.addressWork);
  };

  return (
    <StepLayout title="Параметры займа" step={3} totalSteps={3}>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="field">
          <span>Сумма займа: {watchedAmount}$</span>
          <input
            type="range"
            min={LOAN_AMOUNT.min}
            max={LOAN_AMOUNT.max}
            step={LOAN_AMOUNT.step}
            {...register(FormField.LoanAmount, { valueAsNumber: true })}
          />
          {errors.loanAmount ? (
            <span className="error">{errors.loanAmount.message}</span>
          ) : null}
        </label>

        <label className="field">
          <span>Срок займа: {watchedTerm} дней</span>
          <input
            type="range"
            min={LOAN_TERM.min}
            max={LOAN_TERM.max}
            step={LOAN_TERM.step}
            {...register(FormField.LoanTerm, { valueAsNumber: true })}
          />
          {errors.loanTerm ? <span className="error">{errors.loanTerm.message}</span> : null}
        </label>

        {submitError ? <p className="error">{submitError}</p> : null}

        <div className="form-actions">
          <button type="button" className="button button--ghost" onClick={handleBack}>
            Назад
          </button>
          <button type="submit" className="button button--primary" disabled={isSubmitting}>
            {isSubmitting ? 'Отправка...' : 'Подать заявку'}
          </button>
        </div>
      </form>
    </StepLayout>
  );
};
