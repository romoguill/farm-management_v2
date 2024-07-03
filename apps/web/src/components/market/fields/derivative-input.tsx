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
import { derivativeSchema } from '@farm/trpc-api/validation-schemas';

interface DerivativeInputProps {
  onChange: (value: string) => void;
  defaultValue: string;
}

function DerivativeInput({ onChange, defaultValue }: DerivativeInputProps) {
  return (
    <FormItem>
      <FormLabel>Derivative</FormLabel>
      <FormControl>
        <Select onValueChange={onChange} defaultValue={defaultValue}>
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
  );
}
export default DerivativeInput;
