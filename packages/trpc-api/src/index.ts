import { type inferRouterInputs, type inferRouterOutputs } from "@trpc/server";
import { type AppRouter, appRouter } from "./root.router";
import { createCallerFactory, createTRPCContext } from "./trpc";

type RouterInputs = inferRouterInputs<AppRouter>;
type RouterOutputs = inferRouterOutputs<AppRouter>;

export { appRouter, createCallerFactory, createTRPCContext };
export type { AppRouter, RouterInputs, RouterOutputs };
