import React, { forwardRef } from 'react';

interface FormInputProps {
  label: string;
  type: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  autofocus?: boolean;
}

export const FormInput: React.FC<FormInputProps> = forwardRef<HTMLInputElement, FormInputProps>(({
  label,
  type,
  name,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  autofocus,
}, ref) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-dark-gray mb-1">
        {label}
      </label>
      <input
        ref={ref}
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        autoFocus={autofocus}
        
        className={`
          w-full rounded-lg border px-4 py-2 font-sans shadow-soft-float
          focus:outline-none focus:ring-2 focus:ring-calming-blue
          ${error ? 'border-red-500' : 'border-muted-lavender/50 bg-white'}
        `}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
});
