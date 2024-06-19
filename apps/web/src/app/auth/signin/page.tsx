'use client';

import { appRouter } from '@farm/trpc-api';
import { api } from 'src/trpc/react';

function SignInPage() {
  const { mutate, data } = api.auth.signInGoogle.useMutation();
  console.log(data);
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
