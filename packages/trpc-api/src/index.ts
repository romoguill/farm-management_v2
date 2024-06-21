import 'dotenv/config';

import {
  RouterCaller,
  type inferRouterInputs,
  type inferRouterOutputs,
} from '@trpc/server';
import { type AppRouter, appRouter } from './root.router';
import { createCallerFactory, createTRPCContext } from './trpc';
import { google } from './lib/oauth';

type RouterInputs = inferRouterInputs<AppRouter>;
type RouterOutputs = inferRouterOutputs<AppRouter>;

const createCaller = createCallerFactory(appRouter);

export { appRouter, createCaller, createTRPCContext, google };
export type { AppRouter, RouterInputs, RouterOutputs };
