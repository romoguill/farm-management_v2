'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
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

function SignInPage() {
  const router = useRouter();
  const { mutate } = api.auth.signInGoogle.useMutation({
    onSuccess: ({ url }) => {
      router.push(url);
    },
  });

  const form = useForm<z.infer<typeof loginSchema>>({
    defaultValues: { email: '', password: '' },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = (data) => {};

  return (
    <div className='border-primary w-full border sm:w-[400px]'>
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
                  <Input placeholder='Email' {...field} type='password' />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type='submit'>Sign In</Button>
        </form>
      </Form>
      <Button>
        <Image src='/google.svg' height={16} width={16} alt='google logo' />
        Sign In with Google
      </Button>
    </div>
  );
}

export default SignInPage;
