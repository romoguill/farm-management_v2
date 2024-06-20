'use client';

import { AppRouter } from '@farm/trpc-api';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  CreateTRPCReact,
  createTRPCReact,
  httpBatchLink,
  loggerLink,
} from '@trpc/react-query';
import { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { PropsWithChildren, useState } from 'react';
import superjson from 'superjson';

const createQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30 * 1000, // 30 seconds of query cache
      },
    },
  });

let clientQueryClientSingleton: QueryClient | undefined = undefined;

const getQueryClient = () => {
  if (typeof window === 'undefined') {
    return createQueryClient();
  } else {
    return (clientQueryClientSingleton ??= createQueryClient());
  }
};

// export const api: CreateTRPCReactBase<AppRouter, unknown> & DecoratedProcedureRecord<> =
//   createTRPCReact<AppRouter>();

export const api: CreateTRPCReact<AppRouter, unknown, null> =
  createTRPCReact<AppRouter>();
export type RouterInputs = inferRouterInputs<AppRouter>;
export type RouterOutputs = inferRouterOutputs<AppRouter>;

export function TRPCReactProvider(props: PropsWithChildren) {
  const queryClient = getQueryClient();

  const [trpcClient] = useState(() => {
    return api.createClient({
      transformer: superjson,
      links: [
        loggerLink({
          enabled: (operation) =>
            process.env.NODE_ENV === 'development' ||
            (operation.direction === 'down' &&
              operation.result instanceof Error),
        }),
        httpBatchLink({
          url: 'http://localhost:4000/api/trpc',
          fetch(url, options) {
            return fetch(url, {
              ...options,
              credentials: 'include',
            });
          },
        }),
      ],
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <api.Provider client={trpcClient} queryClient={queryClient}>
        {props.children}
      </api.Provider>
    </QueryClientProvider>
  );
}
