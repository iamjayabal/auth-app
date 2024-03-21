import { z } from 'zod';

export const signupFormSchema = z
  .object({
    firstName: z.string().min(3, {
      message: 'Minimum 2 characters required.',
    }),
    lastName: z.string().min(1, {
      message: 'Minimum 1 character required',
    }),
    username: z.string().min(5, {
      message: 'Minimum 5 characters required.',
    }),
    email: z
      .string()
      .nonempty('Email is required')
      .email('Please enter valid email id'),
    password: z
      .string()
      .min(4, 'Minimum 4 charactors required')
      .max(16, 'Maximum 16 charactors allowd'),
    confirmPassword: z.string().nonempty("Passwords don't match"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'], // path of error
  });

export interface signupFormType extends z.infer<typeof signupFormSchema> {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const signupDefaultValues = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};
