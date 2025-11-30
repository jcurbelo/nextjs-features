import { router } from "./server";
import { exampleRouter } from "./routers/example";

// Root router - merge all sub-routers here
// https://trpc.io/docs/server/routers

export const appRouter = router({
  example: exampleRouter,
});

// Export type for client usage
export type AppRouter = typeof appRouter;

