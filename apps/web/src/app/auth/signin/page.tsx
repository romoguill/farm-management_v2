'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { loginSchema } from '@farm/trpc-api/validation-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { api } from '../../../trpc/react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { useState } from 'react';
import Link from 'next/link';
import AsyncButton from '@/components/global/AsyncButton';

function SignInPage() {
  const [submitError, setSubmitError] = useState('');
  const router = useRouter();

  const { mutate: loginWithGoogle, isLoading: isGoogleLoading } =
    api.auth.signInGoogle.useMutation({
      onSuccess: ({ url }) => {
        router.push(url);
      },
    });
  const { mutate: loginWithCredentials, isLoading: isCredentialsLoading } =
    api.auth.signInCredentials.useMutation({
      onError: (error) => {
        setSubmitError(error.message);
      },
    });

  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = (data) => {
    loginWithCredentials(data);
  };

  return (
    <div className='w-full sm:w-[400px]'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='Email' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='password'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder='Password' {...field} type='password' />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {submitError && <p className='my-2 text-red-500'>{submitError}</p>}
          <AsyncButton
            type='submit'
            className='w-full'
            isLoading={isCredentialsLoading}
          >
            Sign In
          </AsyncButton>
        </form>
      </Form>

      <p className='mt-2 text-sm'>
        Don&apos;t have an account?{' '}
        <Link href={'/auth/signup'} className='font-semibold text-blue-600'>
          Sign Up
        </Link>
      </p>

      <div className='my-5 flex items-center'>
        <Separator className='h-[2px] shrink bg-amber-900/20' />
        <p className='mx-2 text-xs font-semibold leading-none text-amber-900'>
          OR
        </p>
        <Separator className='h-[2px] shrink bg-amber-900/20' />
      </div>

      <AsyncButton
        className='flex w-full gap-2'
        onClick={() => loginWithGoogle()}
        isLoading={isGoogleLoading}
      >
        <Image src='/google.svg' height={16} width={16} alt='google logo' />
        Sign In with Google
      </AsyncButton>
    </div>
  );
}

export default SignInPage;
