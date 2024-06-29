import 'dotenv/config';

import { type inferRouterInputs, type inferRouterOutputs } from '@trpc/server';
import { google } from './lib/oauth';
import { appRouter, type AppRouter } from './root.router';
import { createCallerFactory, createTRPCContext } from './trpc';
import { loginSchema, registerSchema } from './validation-schemas/auth.schema';

type RouterInputs = inferRouterInputs<AppRouter>;
type RouterOutputs = inferRouterOutputs<AppRouter>;

const createCaller = createCallerFactory(appRouter);

export { appRouter, createCaller, createTRPCContext, google };
export type { AppRouter, RouterInputs, RouterOutputs };
