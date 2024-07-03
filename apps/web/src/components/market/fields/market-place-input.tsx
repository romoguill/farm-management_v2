import {
  FormControl,
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
import { marketPlaceSchema } from '@farm/trpc-api/validation-schemas';

interface MarketPlaceInputProps {
  onChange: (value: string) => void;
  defaultValue: string;
}

function MarketPlaceInput({ onChange, defaultValue }: MarketPlaceInputProps) {
  return (
    <FormItem>
      <FormLabel>Market Place</FormLabel>
      <FormControl>
        <Select onValueChange={onChange} defaultValue={defaultValue}>
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
  );
}
export default MarketPlaceInput;
