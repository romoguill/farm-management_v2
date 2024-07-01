import { Loader2 } from 'lucide-react';
import { Button, ButtonProps } from '../ui/button';

interface AsyncButtonProps extends ButtonProps {
  isLoading?: boolean;
  children: React.ReactNode;
}

function AsyncButton({ isLoading, children, ...props }: AsyncButtonProps) {
  return (
    <Button {...props} disabled={isLoading}>
      {isLoading ? <Loader2 className='animate-spin' /> : children}
    </Button>
  );
}
export default AsyncButton;
