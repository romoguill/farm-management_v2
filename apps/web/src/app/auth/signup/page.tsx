'use client';

import { appRouter } from '@farm/trpc-api';
import { useRouter } from 'next/navigation';
import { api } from '../../../trpc/react';

function SignUpPage() {
  const router = useRouter();
  const { mutate } = api.auth.signInGoogle.useMutation({
    onSuccess: ({ url }) => {
      router.push(url);
    },
  });

  return (
    <div className='space-y-4'>
      <div>
        <h1>Sign In</h1>
        <label>
          Email
          <input />
        </label>
        <label>
          Password
          <input />
        </label>
      </div>
      <div>
        <button onClick={() => mutate()}>Sign in with Google</button>
      </div>
    </div>
  );
}

export default SignUpPage;
