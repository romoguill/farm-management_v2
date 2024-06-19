import 'dotenv/config';

import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { type AppRouter, appRouter } from './root.router';
import { createCallerFactory, createTRPCContext } from './trpc';

type RouterInputs = inferRouterInputs<AppRouter>;
type RouterOutputs = inferRouterOutputs<AppRouter>;

const createCaller = createCallerFactory(appRouter);

export { appRouter, createCaller, createTRPCContext };
export type { AppRouter, RouterInputs, RouterOutputs };
