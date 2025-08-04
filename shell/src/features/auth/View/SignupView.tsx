import React, { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../useAuth';
import { signupSchema } from '../schemas';
import type { SignupFormData } from '../schemas';
import { FormInput } from '../components/FormInput';

export const SignupView: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
      } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [isPending, startTransition] = useTransition();
  const [localError, setLocalError] = useState<string | null>(null);

  const onSubmit = (data: SignupFormData) => {
    setLocalError(null); // Clear previous error
    startTransition(async () => {
      try {
        await signup(data.email, data.password);
        navigate('/chat'); // Redirect to chat after successful signup
      } catch (err: any) {
        // Set local error message
        setLocalError(err?.message || 'Signup failed. Please try again.');
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
        <h2 className="text-2xl font-bold text-dark-gray mb-6 text-center">Create an Account</h2>
        
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
                placeholder="Create a password"
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
            {isPending ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-dark-gray">
            Already have an account?{' '}
            <button
              onClick={() => navigate('/auth/login')}
              className="text-calming-blue font-medium hover:underline focus:outline-none"
            >
              Login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
