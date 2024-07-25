'use client';

import AsyncButton from '@/components/global/AsyncButton';
import CalendarInput from '@/components/market/fields/calendar-input';
import CurrencyInput from '@/components/market/fields/currency-input';
import DerivativeInput from '@/components/market/fields/derivative-input';
import GrainInput from '@/components/market/fields/grain-input';
import MarketPlaceInput from '@/components/market/fields/market-place-input';
import { Form, FormField } from '@/components/ui/form';
import { api } from '@/trpc/react';
import {
  MarketDataQueryDTO,
  currencySchema,
  derivativeSchema,
  grainSchema,
  marketPlaceSchema,
  marketQuerySchema,
} from '@farm/trpc-api/validation-schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { z } from 'zod';

function MarketFilter() {
  const form = useForm<MarketDataQueryDTO>({
    resolver: zodResolver(marketQuerySchema),
    defaultValues: {
      currencyRef: 'DOLAR',
      derivative: 'FUTURE',
      from: new Date(),
      to: new Date(),
      settlement: new Date(),
      grain: 'SOY',
      marketPlace: 'ROSARIO',
    },
  });

  const { data, isLoading, refetch } = api.market.getData.useQuery(
    form.getValues(),
    { enabled: false },
  );

  const onSubmit: SubmitHandler<MarketDataQueryDTO> = (data) => {
    refetch();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='w-full space-y-3 p-4'
      >
        <FormField
          control={form.control}
          name='currencyRef'
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
            <GrainInput onChange={field.onChange} defaultValue={field.value} />
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

        <div className='grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3'>
          <FormField
            control={form.control}
            name='settlement'
            render={({ field }) => (
              <CalendarInput
                onChange={field.onChange}
                value={field.value}
                label='Settlement'
                placeholder='Date'
              />
            )}
          />

          <FormField
            control={form.control}
            name='from'
            render={({ field }) => (
              <CalendarInput
                onChange={field.onChange}
                value={field.value}
                label='From'
                placeholder='Start date'
              />
            )}
          />

          <FormField
            control={form.control}
            name='to'
            render={({ field }) => (
              <CalendarInput
                onChange={field.onChange}
                value={field.value}
                label='To'
                placeholder='End date'
              />
            )}
          />
        </div>

        <AsyncButton>Submit</AsyncButton>
      </form>
    </Form>
  );
}
export default MarketFilter;
