import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SubmitHandler, useForm } from 'react-hook-form';

type InputSchema = {
  code: string;
};

function EmailVerification() {
  const form = useForm<InputSchema>({
    defaultValues: {
      code: '',
    },
  });

  const onSubmit: SubmitHandler<InputSchema> = (data) => {};

  return (
    <div>
      <h2>Please check your email, and enter the code provided</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='code'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Code</FormLabel>
                <FormControl>
                  <Input placeholder='Enter code from email' {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
}
export default EmailVerification;
