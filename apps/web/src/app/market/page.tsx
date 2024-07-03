'use client';

import AsyncButton from '@/components/global/AsyncButton';
import CurrencyInput from '@/components/market/fields/currency-input';
import DerivativeInput from '@/components/market/fields/derivative-input';
import GrainInput from '@/components/market/fields/grain-input';
import MarketPlaceInput from '@/components/market/fields/market-place-input';
import { Form, FormField } from '@/components/ui/form';
import {
  currencySchema,
  derivativeSchema,
  grainSchema,
  marketPlaceSchema,
} from '@farm/trpc-api/validation-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

const marketSchema = z.object({
  currency: currencySchema,
  derivative: derivativeSchema,
  marketPlace: marketPlaceSchema,
  grain: grainSchema,
});

type MarketSchema = z.infer<typeof marketSchema>;

function MarketPage() {
  const form = useForm<MarketSchema>({
    defaultValues: {
      currency: 'PESO',
    },
    resolver: zodResolver(marketSchema),
  });

  const onSubmit: SubmitHandler<MarketSchema> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name='currency'
            render={({ field }) => (
              <CurrencyInput
                onChange={field.onChange}
                defaultValue={field.value}
              />
            )}
          />
          <FormField
            control={form.control}
            name='derivative'
            render={({ field }) => (
              <DerivativeInput
                onChange={field.onChange}
                defaultValue={field.value}
              />
            )}
          />
          <FormField
            control={form.control}
            name='grain'
            render={({ field }) => (
              <GrainInput
                onChange={field.onChange}
                defaultValue={field.value}
              />
            )}
          />
          <FormField
            control={form.control}
            name='marketPlace'
            render={({ field }) => (
              <MarketPlaceInput
                onChange={field.onChange}
                defaultValue={field.value}
              />
            )}
          />

          <AsyncButton>Submit</AsyncButton>
        </form>
      </Form>
    </div>
  );
}
export default MarketPage;
