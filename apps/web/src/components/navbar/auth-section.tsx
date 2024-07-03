'use client';

import { api } from '@/trpc/react';
import { buttonVariants } from '../ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '../ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { CornerDownLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

function AuthSection() {
  const utils = api.useUtils();
  const router = useRouter();
  const { data, isLoading } = api.auth.me.useQuery(undefined, { retry: 1 });
  const { mutate: logout } = api.auth.signOut.useMutation({
    onSuccess: () => utils.auth.me.reset(),
  });

  console.log(data);

  let authSection;
  if (isLoading) {
    authSection = null;
  } else if (!data) {
    authSection = (
      <div className='ml-auto flex gap-3'>
        <Link
          href='/auth/signin'
          className={buttonVariants({ variant: 'default' })}
        >
          Login
        </Link>
        <Link
          href='/auth/signup'
          className={buttonVariants({ variant: 'secondary' })}
        >
          Register
        </Link>
      </div>
    );
  } else if (data.user) {
    authSection = (
      <DropdownMenu>
        <DropdownMenuTrigger className='ml-auto'>
          <Avatar className='cursor-pointer'>
            <AvatarFallback>
              {data.user.username?.[0]?.toUpperCase() ||
                data.user.email[0]?.toLocaleUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent onCloseAutoFocus={(e) => e.preventDefault()}>
          <DropdownMenuItem
            className='flex gap-2 bg-red-200 hover:bg-red-300 focus:bg-red-300'
            onClick={() => logout()}
          >
            <CornerDownLeft />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return <>{authSection}</>;
}

export default AuthSection;
