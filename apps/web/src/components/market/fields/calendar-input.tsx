import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';

interface CalendarInputProps {
  value: Date;
  onChange: (value: Date | undefined) => void;
  label: string;
  placeholder: string;
}

function CalendarInput({
  value,
  onChange,
  label,
  placeholder,
}: CalendarInputProps) {
  return (
    <FormItem className='space-y-2'>
      <FormLabel>{label}</FormLabel>
      <Popover>
        <PopoverTrigger asChild>
          <FormControl>
            <Button
              variant={'outline'}
              className={cn(
                'w-full min-w-[140px] pl-3 text-left font-normal',
                !value && 'text-muted-foreground',
              )}
            >
              {value ? format(value, 'PPP') : <span>{placeholder}</span>}
              <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
            </Button>
          </FormControl>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            mode='single'
            selected={value}
            onSelect={onChange}
            disabled={(date) =>
              date > new Date() || date < new Date('1900-01-01')
            }
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <FormMessage />
    </FormItem>
  );
}
export default CalendarInput;
