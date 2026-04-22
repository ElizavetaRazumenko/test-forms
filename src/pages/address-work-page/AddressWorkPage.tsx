import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormField, ROUTES } from '../../constants/form.ts';
import { useLoanFormContext } from '../../context/use-loan-form-context.ts';
import { addressWorkSchema } from '../../schema/form.ts';
import { StepLayout } from '../../components/step-layout/StepLayout.tsx';
import type { AddressWorkValues } from './types.ts';
import { hasPersonalData } from './helpers.ts';

export const AddressWorkPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    formValues,
    updateFormValues,
    workPlaces,
    isWorkPlacesLoading,
    workPlacesError,
    loadWorkPlaces,
  } = useLoanFormContext();

  useEffect(() => {
    if (!hasPersonalData(formValues)) {
      navigate(ROUTES.personalData, { replace: true });
      return;
    }

    void loadWorkPlaces();
  }, [formValues, loadWorkPlaces, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressWorkValues>({
    resolver: zodResolver(addressWorkSchema),
    mode: 'onTouched',
    defaultValues: {
      workPlace: formValues.workPlace,
      address: formValues.address,
    },
  });

  const onSubmit = (values: AddressWorkValues) => {
    updateFormValues(values);
    navigate(ROUTES.loanParams);
  };

  const handleBack = () => {
    navigate(ROUTES.personalData);
  };

  return (
    <StepLayout title="Адрес и место работы" step={2} totalSteps={3}>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="field">
          <span>Место работы</span>
          <select {...register(FormField.WorkPlace)} disabled={isWorkPlacesLoading}>
            <option value="">
              {isWorkPlacesLoading ? 'Загрузка...' : 'Выберите место работы'}
            </option>
            {workPlaces.map((workPlace) => (
              <option key={workPlace} value={workPlace}>
                {workPlace}
              </option>
            ))}
          </select>
          {errors.workPlace ? (
            <span className="error">{errors.workPlace.message}</span>
          ) : null}
          {workPlacesError ? <span className="error">{workPlacesError}</span> : null}
        </label>

        <label className="field">
          <span>Адрес проживания</span>
          <input type="text" {...register(FormField.Address)} />
          {errors.address ? <span className="error">{errors.address.message}</span> : null}
        </label>

        <div className="form-actions">
          <button type="button" className="button button--ghost" onClick={handleBack}>
            Назад
          </button>
          <button type="submit" className="button button--primary">
            Далее
          </button>
        </div>
      </form>
    </StepLayout>
  );
};
