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
  Grain,
  derivativeSchema,
  grainSchema,
} from '@farm/trpc-api/validation-schemas';
import { ControllerProps } from 'react-hook-form';

type FormValues = {
  grain: Grain;
};

function GrainField({
  control,
}: {
  control: ControllerProps<FormValues>['control'];
}) {
  return (
    <FormField
      control={control}
      name='grain'
      render={({ field }) => (
        <FormItem>
          <FormLabel>Grain</FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
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
      )}
    />
  );
}
export default GrainField;
