import React, { useTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { loginSchema } from '../schemas';
import type { LoginFormData } from '../schemas';
import { FormInput } from '../components/FormInput';
import { useAuth } from '../useAuth';

export const LoginView: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'test@gmail.com',
      password: '123456789a',
    },
  });
  
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [localError, setLocalError] = useState<string | null>(null);

  const onSubmit = (data: LoginFormData) => {
    setLocalError(null); // Clear previous error
    startTransition(async () => {
      try {
        await login(data.email, data.password);
        navigate('/chat');
      } catch (err: any) {
        // Set local error message
        setLocalError(err?.message || 'Login failed. Please try again.');
      }
    });
  };

  // Clear error on input change
  const handleInputChange = () => {
    if (localError) setLocalError(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-white p-4">
      <div className="w-full max-w-md rounded-xl border border-muted-lavender/50 bg-white p-8 shadow-soft-float">
        <h2 className="text-2xl font-bold text-dark-gray mb-6 text-center">Login to Imperial Shell</h2>
        
        {localError && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700" role="alert">
            {localError}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          {(() => {
            const { onChange, ...emailProps } = register('email');
            return (
              <FormInput
                label="Email"
                autofocus={true}
                type="email"
                placeholder="Enter your email"
                error={errors.email?.message}
                onChange={e => {
                  handleInputChange();
                  onChange(e);
                }}
                {...emailProps}
              />
            );
          })()}
          
          {(() => {
            const { onChange, ...passwordProps } = register('password');
            return (
              <FormInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                error={errors.password?.message}
                onChange={e => {
                  handleInputChange();
                  onChange(e);
                }}
                {...passwordProps}
              />
            );
          })()}
          
          <button
            type="submit"
            disabled={isPending}
            className={`
              w-full rounded-lg px-4 py-2 font-medium text-white shadow-soft-float
              transition-all duration-200 ease-in-out
              ${isPending 
                ? 'bg-calming-blue/50 cursor-not-allowed' 
                : 'bg-calming-blue hover:bg-calming-blue/80 active:scale-95'
              }
            `}
          >
            {isPending ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-dark-gray">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/auth/signup')}
              className="text-calming-blue font-medium hover:underline focus:outline-none"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
