import { cacheLife, cacheTag } from "next/cache";

// The 'use cache' directive marks this function for caching
// Results are cached and reused across requests
// https://nextjs.org/docs/app/api-reference/directives/use-cache

export async function getCachedTimestamp() {
  "use cache";

  // Use the 'default' preset we defined in next.config.ts
  cacheLife("default");

  // Tag this cache entry so we can invalidate it later
  cacheTag("timestamp");

  // This simulates an expensive operation
  await new Promise((resolve) => setTimeout(resolve, 500));

  return {
    timestamp: new Date().toISOString(),
    random: Math.random().toString(36).substring(7),
  };
}

// A separate cached function with different cache settings
export async function getRandomQuote() {
  "use cache";

  // Cache for a longer period
  cacheLife("hours");
  cacheTag("quote");

  const quotes = [
    "The only way to do great work is to love what you do.",
    "Innovation distinguishes between a leader and a follower.",
    "Stay hungry, stay foolish.",
    "Simplicity is the ultimate sophistication.",
    "The best way to predict the future is to invent it.",
  ];

  await new Promise((resolve) => setTimeout(resolve, 300));

  return quotes[Math.floor(Math.random() * quotes.length)];
}

