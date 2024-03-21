'use client';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FormInput from '@/components/custom-ui/FormInput';
import {
  signupFormType,
  signupDefaultValues,
  signupFormSchema,
} from '@/models/signup.schema';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import CardWrapper from '../custom-ui/Card';
import Link from 'next/link';

export default function SignupForm() {
  const route = useRouter();
  // 1. Define form.
  const form = useForm<signupFormType>({
    resolver: zodResolver(signupFormSchema),
    defaultValues: signupDefaultValues,
    mode: 'all',
  });

  const { formState, reset } = form;
  const { isSubmitSuccessful } = formState;

  // 2. Submit handler.
  const onSubmit = async (values: signupFormType) => {
    console.log(values);
    try {
      const response = await axios.post('/api/users/signup', values);
      console.log('Signup success', response.data);
      reset();
      // route.push('/login');
    } catch (error: any) {
      console.log('Signup failed', error.message);
    } finally {
      console.log('api call finished');
    }
  };
  return (
    <>
      {!isSubmitSuccessful ? (
        <CardWrapper
          title='Create an account'
          description='Enter your details below to create your account'
          content={
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <div className='grid gap-2'>
                  <div className='grid grid-cols-2 gap-2'>
                    <FormInput
                      control={form.control}
                      required
                      name='firstName'
                      type='text'
                      label='First Name'
                      placeholder='First Name'
                    />
                    <FormInput
                      control={form.control}
                      required
                      name='lastName'
                      type='text'
                      label='Last Name'
                      placeholder='Last Name'
                    />
                  </div>
                  <FormInput
                    control={form.control}
                    required
                    name='username'
                    type='text'
                    label='User Name'
                    placeholder='User Name'
                  />
                  <FormInput
                    control={form.control}
                    required
                    name='email'
                    type='email'
                    label='Email'
                    placeholder='Email Address'
                  />
                  <div className='grid grid-cols-2 gap-2'>
                    <FormInput
                      control={form.control}
                      required
                      name='password'
                      type='password'
                      label='Password'
                      placeholder='Enter your password'
                    />
                    <FormInput
                      control={form.control}
                      required
                      name='confirmPassword'
                      type='password'
                      label='Confirm Password'
                      placeholder='Re-enter your password'
                    />
                  </div>
                  <Button type='submit' className='w-full'>
                    Signup
                  </Button>
                </div>
              </form>
            </Form>
          }
          footer={
            <p className='px-8 pb-4 text-center text-sm text-muted-foreground'>
              Already have an account please{' '}
              <Link
                href='/login'
                className='underline underline-offset-4 hover:text-primary'
              >
                click here
              </Link>{' '}
              to login.
            </p>
          }
        />
      ) : (
        <CardWrapper
          title='Success'
          description='Your account is created successfully!'
          content={
            <div className='flex justify-center items-center'>
              <Button>
                <Link href='/login'> Login</Link>
              </Button>
            </div>
          }
        />
      )}
    </>
  );
}
