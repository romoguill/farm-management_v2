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
import { Separator } from '@/components/ui/separator';

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
          <Button type='submit' className='w-full'>
            Sign In
          </Button>
        </form>
      </Form>

      <div className='my-5 flex items-center'>
        <Separator className='h-[2px] shrink bg-amber-900/20' />
        <p className='mx-2 text-xs font-semibold leading-none text-amber-900'>
          OR
        </p>
        <Separator className='h-[2px] shrink bg-amber-900/20' />
      </div>
      <Button className='w-full'>
        <Image src='/google.svg' height={16} width={16} alt='google logo' />
        Sign In with Google
      </Button>
    </div>
  );
}

export default SignInPage;
