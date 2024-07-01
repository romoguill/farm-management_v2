'use client';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { api } from '@/trpc/react';

import { SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'sonner';

type InputSchema = {
  code: string;
};

function EmailVerification() {
  const { mutate: resendCode } = api.auth.resendCode.useMutation({
    onSuccess: () => {
      toast.success('New code sent to email');
    },
    onError: () => {
      toast.error("Couldn't send email. Try again later");
    },
  });

  const form = useForm<InputSchema>({
    defaultValues: {
      code: '',
    },
  });

  const onSubmit: SubmitHandler<InputSchema> = (data) => {};

  return (
    <div>
      <h2 className='mb-4'>
        Please check your email, and enter the 8 digits provided
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex gap-4'>
          <FormField
            control={form.control}
            name='code'
            render={({ field }) => (
              <FormItem className='flex-grow'>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input placeholder='Enter code from email' {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type='submit' className='self-end'>
            Validate
          </Button>
        </form>
      </Form>

      <Button
        onClick={() => resendCode()}
        size='sm'
        variant='secondary'
        className='mt-3'
      >
        Resend Code
      </Button>
    </div>
  );
}
export default EmailVerification;
