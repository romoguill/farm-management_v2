'use client';

import AsyncButton from '@/components/global/AsyncButton';
import CurrencyField from '@/components/market/fields/currency-field';
import { Form } from '@/components/ui/form';
import { currencySchema } from '@farm/trpc-api/validation-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const marketFilterSchema = z.object({
  currency: currencySchema,
});

type MarketFilter = z.infer<typeof marketFilterSchema>;

function MarketPage() {
  const form = useForm<MarketFilter>({
    defaultValues: {
      currency: 'PESO',
    },
    resolver: zodResolver(marketFilterSchema),
  });

  const onSubmit: SubmitHandler<MarketFilter> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CurrencyField control={form.control} />

          <AsyncButton>Submit</AsyncButton>
        </form>
      </Form>
    </div>
  );
}
export default MarketPage;
