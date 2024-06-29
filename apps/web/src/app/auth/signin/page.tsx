'use client';

import { RouterInputs, appRouter } from '@farm/trpc-api';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { api } from 'src/trpc/react';
import { zodResolver } from '@hookform/resolvers/zod';

function SignInPage() {
  const router = useRouter();
  const { mutate } = api.auth.signInGoogle.useMutation({
    onSuccess: ({ url }) => {
      router.push(url);
    },
  });

  const form = useForm<RouterInputs['auth']['signInCredentials']>({
    defaultValues: { email: '', password: '' },
    resolver: zodRe,
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

export default SignInPage;
