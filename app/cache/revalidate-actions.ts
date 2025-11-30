"use server";

import { revalidateTag } from "next/cache";

// Server actions to revalidate cache tags on demand
// In Next.js 16, revalidateTag requires a cache profile as second argument
// https://nextjs.org/docs/app/api-reference/functions/revalidateTag

export async function revalidateTimestamp() {
  // "default" matches the profile used in getCachedTimestamp
  revalidateTag("timestamp", "default");
}

export async function revalidateQuote() {
  // "hours" matches the profile used in getRandomQuote
  revalidateTag("quote", "hours");
}

