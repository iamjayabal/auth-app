import { z } from 'zod';

export const loginFormSchema = z.object({
  email: z
    .string()
    .nonempty('Email is required')
    .email('Please enter valid email id'),
  password: z.string().min(4, 'Minimum 4 charactors required'),
});

export interface loginFormType extends z.infer<typeof loginFormSchema> {
  email: string;
  password: string;
}

export const loginDefaultValues = {
  email: '',
  password: '',
};
