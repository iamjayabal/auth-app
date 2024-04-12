'use client';
import { Button } from '@/components/ui/button';
import FormInput from '@/components/custom-ui/FormInput';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import Link from 'next/link';
import CardWrapper from '@/components/custom-ui/Card';
import {
  loginDefaultValues,
  loginFormSchema,
  loginFormType,
} from '@/models/login.schema';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ButtonLoading } from '../shared/ButtonLoading';

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(true);
  const [errorText, setErrorText] = useState();
  // 1. Define form.
  const form = useForm<loginFormType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: loginDefaultValues,
    mode: 'all',
  });

  // 2. Submit handler.
  const onSubmit = async (values: loginFormType) => {
    console.log(values);
    setLoading(true);
    try {
      const response = await axios.post('/api/users/login', values);
      console.log('Login is successful!', response);
      router.push('/');
    } catch (error: any) {
      setErrorText(error.response.data.error);
      setSuccess(false);
      console.log('Login failed', error.message);
    } finally {
      console.log('api call completed');
      setLoading(false);
    }
  };
  return (
    <>
      <CardWrapper
        title='Login'
        description='Enter your login credentials'
        content={
          <Form {...form}>
            {!success && (
              <p className='text-sm text-muted-foreground text-red-500'>
                {errorText}
              </p>
            )}

            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className='flex flex-col gap-2'>
                <FormInput
                  control={form.control}
                  required
                  name='email'
                  type='email'
                  label='Email'
                  placeholder='Email Address'
                />
                <FormInput
                  control={form.control}
                  required
                  name='password'
                  type='password'
                  label='Password'
                  placeholder='Enter your password'
                />
                {!loading ? (
                  <Button type='submit' className='w-full'>
                    Submit
                  </Button>
                ) : (
                  <ButtonLoading />
                )}
              </div>
            </form>
          </Form>
        }
        footer={
          <p className='px-8 pb-4 text-center text-sm text-muted-foreground'>
            Do not have an account please{' '}
            <Link
              href='/signup'
              className='underline underline-offset-4 hover:text-primary'
            >
              click here
            </Link>{' '}
            to signup.
          </p>
        }
      />
    </>
  );
}
