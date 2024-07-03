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
  MarketPlace,
  currencySchema,
  marketPlaceSchema,
  type Currency,
} from '@farm/trpc-api/validation-schemas';
import { ControllerProps } from 'react-hook-form';

type FormValues = {
  marketPlace: MarketPlace;
};

function MarketPlaceField({
  control,
}: {
  control: ControllerProps<FormValues>['control'];
}) {
  return (
    <FormField
      control={control}
      name='marketPlace'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Market Place</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder='Pick market...' />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {marketPlaceSchema.options.map((marketPlace) => (
                  <SelectItem
                    key={marketPlace}
                    value={marketPlace}
                    className='capitalize'
                  >
                    {marketPlace.toLocaleUpperCase()}
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
export default MarketPlaceField;
