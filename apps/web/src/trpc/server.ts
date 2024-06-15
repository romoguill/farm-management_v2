import { headers } from 'next/headers';
import { AppRouter, appRouter, createTRPCContext } from '@farm/trpc-api';
import { cache } from 'react';
import { createCallerFactory } from '@trpc/server/unstable-core-do-not-import';

const createContext = cache(async () => {
  const header = new Headers(headers());
  header.set('x-trpc-source', 'rsc');

  return createTRPCContext({
    headers: header,
  });
});
