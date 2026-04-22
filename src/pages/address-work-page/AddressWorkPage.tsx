import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormField, ROUTES } from '../../constants/form.ts';
import { useLoanFormContext } from '../../context/use-loan-form-context.ts';
import { addressWorkSchema } from '../../schema/form.ts';
import { FormInput } from '../../components/form-input/FormInput.tsx';
import { StepLayout } from '../../components/step-layout/StepLayout.tsx';
import type { AddressWorkValues } from './types.ts';
import { hasPersonalData } from './helpers.ts';

export const AddressWorkPage: React.FC = () => {
  const navigate = useNavigate();
  const [isShakeActive, setIsShakeActive] = useState(false);
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
    getValues,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressWorkValues>({
    resolver: zodResolver(addressWorkSchema),
    mode: 'onChange',
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
    updateFormValues(getValues());
    navigate(ROUTES.personalData);
  };

  const onInvalidSubmit = () => {
    setIsShakeActive(false);

    requestAnimationFrame(() => {
      setIsShakeActive(true);
    });
  };

  return (
    <StepLayout title="Адрес и место работы" step={2} totalSteps={3}>
      <form
        className={`form${isShakeActive ? ' form--shake' : ''}`}
        onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
        onAnimationEnd={() => setIsShakeActive(false)}
        noValidate
      >
        <label className="field">
          <span>Место работы</span>
          <select className="form-input-field" {...register(FormField.WorkPlace)} disabled={isWorkPlacesLoading}>
            <option value="">
              {isWorkPlacesLoading ? 'Загрузка...' : 'Выберите место работы'}
            </option>
            {workPlaces.map((workPlace) => (
              <option key={workPlace} value={workPlace}>
                {workPlace}
              </option>
            ))}
          </select>
          <div className="form-input-error">  
            {errors.workPlace ? <span className="error">{errors.workPlace.message}</span> : null}
          </div>
          {workPlacesError ? <span className="error">{workPlacesError}</span> : null}
        </label>

        <FormInput
          type="text"
          label="Адрес проживания"
          error={errors.address?.message}
          {...register(FormField.Address)}
        />

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
