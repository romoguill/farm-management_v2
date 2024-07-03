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
import { currencySchema } from '@farm/trpc-api/validation-schemas';

interface CurrencyInputProps {
  onChange: (value: string) => void;
  defaultValue: string;
}

function CurrencyInput({ onChange, defaultValue }: CurrencyInputProps) {
  return (
    <FormItem>
      <FormLabel>Currency</FormLabel>
      <FormControl>
        <Select onValueChange={onChange} defaultValue={defaultValue}>
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
  );
}
export default CurrencyInput;
