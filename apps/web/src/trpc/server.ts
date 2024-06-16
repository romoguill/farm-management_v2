import { createTRPCContext } from '@farm/trpc-api';
import { headers } from 'next/headers';
import { cache } from 'react';

const createContext = cache(async () => {
  const header = new Headers(headers());
  header.set('x-trpc-source', 'rsc');

  return createTRPCContext({
    headers: header,
  });
});
