"use server";

import { revalidateTag } from "next/cache";

// Server actions to revalidate cache tags on demand
// https://nextjs.org/docs/app/api-reference/functions/revalidateTag

export async function revalidateTimestamp() {
  revalidateTag("timestamp");
}

export async function revalidateQuote() {
  revalidateTag("quote");
}

