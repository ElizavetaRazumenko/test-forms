import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormField, GENDER_OPTIONS, ROUTES } from '../../constants/form.ts';
import { useLoanFormContext } from '../../context/use-loan-form-context.ts';
import { personalDataSchema } from '../../schema/form.ts';
import { StepLayout } from '../../components/step-layout/StepLayout.tsx';
import type { PersonalDataValues } from './types.ts';
import { formatPhoneNumber } from './helpers.ts';

export const PersonalDataPage: React.FC = () => {
  const navigate = useNavigate();
  const { formValues, updateFormValues } = useLoanFormContext();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PersonalDataValues>({
    resolver: zodResolver(personalDataSchema),
    mode: 'onTouched',
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

  return (
    <StepLayout title="Личные данные" step={1} totalSteps={3}>
      <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <label className="field">
          <span>Телефон</span>
          <Controller
            name={FormField.Phone}
            control={control}
            render={({ field }) => (
              <input
                type="tel"
                placeholder="0XXX XXX XXX"
                value={field.value}
                onChange={(event) =>
                  field.onChange(formatPhoneNumber(event.target.value))
                }
              />
            )}
          />
          {errors.phone ? <span className="error">{errors.phone.message}</span> : null}
        </label>

        <label className="field">
          <span>Имя</span>
          <input type="text" {...register(FormField.FirstName)} />
          {errors.firstName ? (
            <span className="error">{errors.firstName.message}</span>
          ) : null}
        </label>

        <label className="field">
          <span>Фамилия</span>
          <input type="text" {...register(FormField.LastName)} />
          {errors.lastName ? (
            <span className="error">{errors.lastName.message}</span>
          ) : null}
        </label>

        <label className="field">
          <span>Пол</span>
          <select {...register(FormField.Gender)}>
            <option value="">Выберите пол</option>
            {GENDER_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.gender ? <span className="error">{errors.gender.message}</span> : null}
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
