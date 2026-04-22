import { zodResolver } from '@hookform/resolvers/zod';
import { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormField, GENDER_OPTIONS, ROUTES } from '../../constants/form.ts';
import { useLoanFormContext } from '../../context/use-loan-form-context.ts';
import { personalDataSchema } from '../../schema/form.ts';
import { FormInput } from '../../components/form-input/FormInput.tsx';
import { StepLayout } from '../../components/step-layout/StepLayout.tsx';
import type { PersonalDataValues } from './types.ts';
import { formatPhoneNumber } from './helpers.ts';

export const PersonalDataPage: React.FC = () => {
  const navigate = useNavigate();
  const { formValues, updateFormValues } = useLoanFormContext();
  const phoneInputRef = useRef<HTMLInputElement | null>(null);
  const [isShakeActive, setIsShakeActive] = useState(false);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalDataValues>({
    resolver: zodResolver(personalDataSchema),
    mode: 'onChange',
    shouldFocusError: false,
    defaultValues: {
      phone: formValues.phone,
      firstName: formValues.firstName,
      lastName: formValues.lastName,
      gender: formValues.gender === '' ? undefined : formValues.gender,
    },
  });

  const onSubmit = (values: PersonalDataValues) => {
    updateFormValues(values);
    navigate(ROUTES.addressWork);
  };

  const onInvalidSubmit = () => {
    setIsShakeActive(false);

    requestAnimationFrame(() => {
      setIsShakeActive(true);
    });
  };

  return (
    <StepLayout title="Личные данные" step={1} totalSteps={3}>
      <form
        className={`form${isShakeActive ? ' form--shake' : ''}`}
        onSubmit={handleSubmit(onSubmit, onInvalidSubmit)}
        onAnimationEnd={() => setIsShakeActive(false)}
        noValidate
      >
        <Controller
          name={FormField.Phone}
          control={control}
          render={({ field }) => (
            <FormInput
              ref={(element) => {
                field.ref(element);
                phoneInputRef.current = element;
              }}
              type="tel"
              label="Телефон"
              placeholder="0XXX XXX XXX"
              name={field.name}
              value={field.value}
              onBlur={field.onBlur}
              onChange={(event) => field.onChange(formatPhoneNumber(event.target.value))}
              error={errors.phone?.message}
            />
          )}
        />

        <FormInput
          type="text"
          label="Имя"
          error={errors.firstName?.message}
          {...register(FormField.FirstName)}
        />

        <FormInput
          type="text"
          label="Фамилия"
          error={errors.lastName?.message}
          {...register(FormField.LastName)}
        />

        <label className="field">
          <span>Пол</span>
          <select className="form-input-field" {...register(FormField.Gender)}>
            <option value="">Выберите пол</option>
            {GENDER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="form-input-error">  
            {errors.gender ? <span className="error">{errors.gender.message}</span> : null}
          </div>
        </label>

        <div className="form-actions form-actions--end">
          <button type="submit" className="button button--primary">
            Далее
          </button>
        </div>
      </form>
    </StepLayout>
  );
};
