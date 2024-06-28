'use client';

import { api } from '@/trpc/react';
import { buttonVariants } from '../ui/button';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '../ui/avatar';

function AuthSection() {
  const { data, isLoading } = api.auth.me.useQuery();
  console.log(isLoading);
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
      <div className='ml-auto'>
        <Avatar>
          <AvatarFallback>{data.user.username[0]}</AvatarFallback>
        </Avatar>
      </div>
    );
  }

  console.log(authSection);

  return <>{authSection}</>;
}
export default AuthSection;
