"use client";

import { createTRPCReact } from "@trpc/react-query";
import type { AppRouter } from "./router";

// Create typed tRPC React hooks
// https://trpc.io/docs/client/react

export const trpc = createTRPCReact<AppRouter>();

