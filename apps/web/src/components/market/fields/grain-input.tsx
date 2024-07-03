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
import { grainSchema } from '@farm/trpc-api/validation-schemas';

interface GrainInputProps {
  onChange: (value: string) => void;
  defaultValue: string;
}

function GrainInput({ onChange, defaultValue }: GrainInputProps) {
  return (
    <FormItem>
      <FormLabel>Grain</FormLabel>
      <FormControl>
        <Select onValueChange={onChange} defaultValue={defaultValue}>
          <FormControl>
            <SelectTrigger>
              <SelectValue placeholder='Pick grain...' />
            </SelectTrigger>
          </FormControl>
          <SelectContent>
            {grainSchema.options.map((grain) => (
              <SelectItem key={grain} value={grain} className='capitalize'>
                {grain.toLocaleUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
}
export default GrainInput;
