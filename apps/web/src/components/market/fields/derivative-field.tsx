import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Derivative,
  MarketPlace,
  derivativeSchema,
  marketPlaceSchema,
} from '@farm/trpc-api/validation-schemas';
import { ControllerProps } from 'react-hook-form';

type FormValues = {
  derivative: Derivative;
};

function DerivativeField({
  control,
}: {
  control: ControllerProps<FormValues>['control'];
}) {
  return (
    <FormField
      control={control}
      name='derivative'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Derivative</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Pick derivative...' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {derivativeSchema.options.map((derivative) => (
                  <SelectItem
                    key={derivative}
                    value={derivative}
                    className='capitalize'
                  >
                    {derivative.toLocaleUpperCase()}
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
export default DerivativeField;
