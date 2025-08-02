import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import { loginSchema } from '../schemas';
import type { LoginFormData } from '../schemas';
import { FormInput } from '../components/FormInput';

export const LoginView: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const navigate = useNavigate();
  const { mutate: login, isPending, isError, error } = useLogin();

  const onSubmit = (data: LoginFormData) => {
    login(data, {
      onSuccess: () => {
        // Redirect to home page or dashboard after successful login
        navigate('/');
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-soft-white p-4">
      <div className="w-full max-w-md rounded-xl border border-muted-lavender/50 bg-white p-8 shadow-soft-float">
        <h2 className="text-2xl font-bold text-dark-gray mb-6 text-center">Login to Imperial Shell</h2>
        
        {isError && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700" role="alert">
            {error?.message || 'An error occurred during login'}
          </div>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Email"
            type="email"
            placeholder="Enter your email"
            error={errors.email?.message}
            {...register('email')}
          />
          
          <FormInput
            label="Password"
            type="password"
            placeholder="Enter your password"
            error={errors.password?.message}
            {...register('password')}
          />
          
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
