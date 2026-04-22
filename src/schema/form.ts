import { z } from 'zod';
import { FormField, LOAN_AMOUNT, LOAN_TERM } from '../constants/form.ts';

export const loanFormSchema = z.object({
  [FormField.Phone]: z
    .string()
    .regex(/^0\d{3} \d{3} \d{3}$/, 'Введите телефон в формате 0XXX XXX XXX'),
  [FormField.FirstName]: z.string().min(1, 'Имя обязательно'),
  [FormField.LastName]: z.string().min(1, 'Фамилия обязательна'),
  [FormField.Gender]: z.enum(['male', 'female'], {
    message: 'Пол обязателен',
  }),
  [FormField.WorkPlace]: z.string().min(1, 'Место работы обязательно'),
  [FormField.Address]: z.string().min(1, 'Адрес обязателен'),
  [FormField.LoanAmount]: z
    .number()
    .min(LOAN_AMOUNT.min, `Минимальная сумма ${LOAN_AMOUNT.min}`)
    .max(LOAN_AMOUNT.max, `Максимальная сумма ${LOAN_AMOUNT.max}`),
  [FormField.LoanTerm]: z
    .number()
    .min(LOAN_TERM.min, `Минимальный срок ${LOAN_TERM.min} дней`)
    .max(LOAN_TERM.max, `Максимальный срок ${LOAN_TERM.max} дней`),
});

export const personalDataSchema = loanFormSchema.pick({
  [FormField.Phone]: true,
  [FormField.FirstName]: true,
  [FormField.LastName]: true,
  [FormField.Gender]: true,
});

export const addressWorkSchema = loanFormSchema.pick({
  [FormField.WorkPlace]: true,
  [FormField.Address]: true,
});

export const loanParamsSchema = loanFormSchema.pick({
  [FormField.LoanAmount]: true,
  [FormField.LoanTerm]: true,
});
