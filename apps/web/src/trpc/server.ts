import { createCaller, createTRPCContext } from '@farm/trpc-api';
import { headers } from 'next/headers';
import { cache } from 'react';

const createContext = cache(() => {
  const header = new Headers(headers());
  header.set('x-trpc-source', 'rsc');

  return createTRPCContext({
    headers: header,
  });
});

export const api = createCaller(await createContext());
