import { AppRouter, appRouter } from '@farm/trpc-api';
import { createTRPCNext } from '@trpc/next';
import {
  TRPCClientError,
  createTRPCProxyClient,
  httpBatchLink,
  loggerLink,
} from '@trpc/react-query';
import { NextPageContext } from 'next';
import { callProcedure } from '@trpc/server';
import 'server-only';
import superjson from 'superjson';
import { observable } from '@trpc/server/observable';

import { createCaller, createTRPCContext } from '@farm/trpc-api';
import { headers } from 'next/headers';
import { cache } from 'react';
import { TRPCErrorResponse } from '@trpc/server/rpc';

const createContext = () => {
  console.log('firstttt');
  const header = new Headers(headers());
  header.set('x-trpc-source', 'rsc');

  console.log('second');

  return createTRPCContext({
    headers: header,
  });
};

export const api = createCaller(await createContext());

// function getBaseUrl() {
//   if (typeof window !== 'undefined')
//     // browser should use relative path
//     return '';
//   if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;
//   return `http://localhost:${process.env.PORT ?? 3000}`;
// }

// export interface SSRContext extends NextPageContext {}

// export const api = createTRPCNext<AppRouter, SSRContext>({
//   config({ ctx }: { ctx: any }) {
//     /**
//      * If you want to use SSR, you need to use the server's full URL
//      * @link https://trpc.io/docs/v11/ssr
//      */
//     return {
//       /**
//        * @link https://trpc.io/docs/v11/client/links
//        */
//       links: [
//         // adds pretty logs to your console in development and logs errors in production
//         loggerLink({
//           enabled: (opts) =>
//             process.env.NODE_ENV === 'development' ||
//             (opts.direction === 'down' && opts.result instanceof Error),
//         }),
//         httpBatchLink({
//           url: `${getBaseUrl()}/api/trpc`,
//           /**
//            * Set custom request headers on every request from tRPC
//            * @link https://trpc.io/docs/v11/ssr
//            */
//           headers() {
//             if (!ctx?.req?.headers) {
//               return {};
//             }
//             // To use SSR properly, you need to forward the client's headers to the server
//             // This is so you can pass through things like cookies when we're server-side rendering

//             const {
//               // If you're using Node 18 before 18.15.0, omit the "connection" header
//               connection: _connection,
//               ...headers
//             } = ctx.req.headers;
//             return headers;
//           },
//           /**
//            * @link https://trpc.io/docs/v11/data-transformers
//            */
//         }),
//       ],
//       /**
//        * @link https://tanstack.com/query/v5/docs/reference/QueryClient
//        */
//       // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
//     };
//   },
//   /**
//    * @link https://trpc.io/docs/v11/ssr
//    */
//   ssr: false,
//   /**
//    * @link https://trpc.io/docs/v11/data-transformers
//    */
//   transformer: superjson,
// });

// export const api = createTRPCProxyClient<AppRouter>({
//   transformer: superjson,
//   links: [
//     loggerLink({
//       enabled: (op) =>
//         process.env.NODE_ENV === 'development' ||
//         (op.direction === 'down' && op.result instanceof Error),
//       // logger: (opts) => {
//       //   if (opts.direction === "up") {
//       //     console.log(pc.orange(`\n>> [tRPC ${opts.type}] ${opts.path}`));
//       //   } else if (opts.direction === "down") {
//       //     if (opts.result instanceof Error || "error" in opts.result.result) {
//       //       console.log(
//       //         pc.red(
//       //           `<< [tRPC ${opts.path}] ${opts.elapsedMs.toFixed(2)}ms ${JSON.stringify(opts.result)}`
//       //         )
//       //       );
//       //     } else {
//       //       console.log(pc.cyan(`<< [tRPC ${opts.path}] ${opts.elapsedMs.toFixed(2)}ms\n`));
//       //     }
//       //   }
//       // },
//     }),
//     /**
//      * Custom RSC link that lets us invoke procedures without using http requests. Since Server
//      * Components always run on the server, we can just call the procedure as a function.
//      */
//     () =>
//       ({ op }) =>
//         observable((observer) => {
//           const context = createContext();

//           callProcedure({
//             procedures: appRouter._def.procedures,
//             path: op.path,
//             rawInput: op.input,
//             ctx: context,
//             type: op.type,
//           })
//             .then((data) => {
//               observer.next({ result: { data } });
//               observer.complete();
//             })
//             .catch((cause: TRPCErrorResponse) => {
//               observer.error(TRPCClientError.from(cause));
//             });
//         }),
//   ],
// });
