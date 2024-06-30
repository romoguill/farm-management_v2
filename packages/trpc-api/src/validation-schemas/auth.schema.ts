import { z } from 'zod';

export const registerSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(20),
    confirmedPassword: z.string().min(6).max(20),
  })
  .refine(({ password, confirmedPassword }) => password === confirmedPassword, {
    message: "Passwords don't match",
    path: ['confirmedPassword'],
  });

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});
