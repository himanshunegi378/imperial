import { z } from "zod";

// Email validation schema
const emailSchema = z.email({ message: "Invalid email format" });

// Password validation schema (minimum 8 characters, at least one letter and one number)
const passwordSchema = z.string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/^(?=.*[A-Za-z])(?=.*\d)/, { 
    message: "Password must contain at least one letter and one number" 
  });

// Sign up validation schema
export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

// Login validation schema
export const loginSchema = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .min(1, 'Email is required'),
  password: z
    .string()
    .min(1, 'Password is required'),
});

// Schema for refresh token validation
// Note: The token will come from an HTTP-only cookie, not the request body
export const refreshTokenSchema = z.object({});

// Password change validation schema
export const passwordChangeSchema = z.object({
  currentPassword: z.string().min(1, { message: "Current password is required" }),
  newPassword: passwordSchema
});

// Type definitions
export type SignUpInput = z.infer<typeof signUpSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
