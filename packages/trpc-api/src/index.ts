import { inferRouterInputs, inferRouterOutputs } from "@trpc/server";
import { AppRouter, appRouter } from "./root.router";
import { createCallerFactory, createTRPCContext } from "./trpc";

type RouterInputs = inferRouterInputs<AppRouter>;
type RouterOutputs = inferRouterOutputs<AppRouter>;

export { appRouter, createCallerFactory, createTRPCContext };
export type { AppRouter, RouterInputs, RouterOutputs };
