import { forwardRef } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label: ReactNode;
  error?: string;
};

export const FormInput = forwardRef<HTMLInputElement, Props>(
  ({ label, error, ...props }, ref) => (
    <label className="field">
      <span className="form-input-label">{label}</span>
      <input ref={ref} className="form-input-field" aria-invalid={Boolean(error)} {...props} />

      <div className="form-input-error">
       {error ? <span className="error">{error}</span> : null}
      </div>
    </label>
  ),
);

FormInput.displayName = 'FormInput';
