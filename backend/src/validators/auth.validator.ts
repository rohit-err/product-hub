import { z } from 'zod';

export const signupSchema = z.object({
  name: z
    .string({ error: 'Name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters'),

  email: z
    .string({ error: 'Email is required' })
    .trim()
    .email('Please enter a valid email')
    .toLowerCase(),

  mobile: z
    .string({ error: 'Mobile number is required' })
    .trim()
    .regex(/^\d{10}$/, 'Mobile number must be 10 digits'),

  password: z
    .string({ error: 'Password is required' })
    .min(6, 'Password must be at least 6 characters'),

  confirmPassword: z
    .string({ error: 'Confirm password is required' }),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const loginSchema = z.object({
  email: z
    .string({ error: 'Email is required' })
    .trim()
    .email('Please enter a valid email')
    .toLowerCase(),

  password: z
    .string({ error: 'Password is required' })
    .min(1, 'Password is required'),
});
