import { initTRPC } from "@trpc/server";
import superjson from "superjson";

// Create tRPC instance with superjson for serializing dates, maps, sets, etc.
// https://trpc.io/docs/server/adapters/nextjs

const t = initTRPC.create({
  transformer: superjson,
});

// Base pieces for building routers and procedures
export const router = t.router;
export const publicProcedure = t.procedure;

