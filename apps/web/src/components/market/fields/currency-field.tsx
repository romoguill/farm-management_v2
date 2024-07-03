import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ControllerProps } from 'react-hook-form';
import {
  currencySchema,
  type Currency,
} from '@farm/trpc-api/validation-schemas';

type FormValues = {
  currency: Currency;
};

function CurrencyField({
  control,
}: {
  control: ControllerProps<FormValues>['control'];
}) {
  return (
    <FormField
      control={control}
      name='currency'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Currency</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Pick currency...' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {currencySchema.options.map((currency) => (
                  <SelectItem
                    key={currency}
                    value={currency}
                    className='capitalize'
                  >
                    {currency.toLocaleUpperCase()}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
export default CurrencyField;
