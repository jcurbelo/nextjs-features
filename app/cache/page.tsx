import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCachedTimestamp, getRandomQuote } from "./data";
import { RevalidateTimestampButton, RevalidateQuoteButton } from "./revalidate-buttons";

export default async function CachePage() {
  // These functions use 'use cache' - results are cached and reused
  const timestamp = await getCachedTimestamp();
  const quote = await getRandomQuote();

  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="text-sm text-muted-foreground hover:underline">
          Back to home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">Composable Caching</h1>
      <p className="text-muted-foreground mb-8">
        The &apos;use cache&apos; directive enables fine-grained caching at the function
        level. Combined with cacheTag, you can invalidate specific cache entries
        on demand.
      </p>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Cached Timestamp</CardTitle>
            <CardDescription>
              Uses cacheLife(&quot;default&quot;) preset from next.config.ts. Refresh the
              page - the timestamp stays the same until cache expires or is
              revalidated.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="font-mono text-sm bg-muted p-3 rounded">
              <p>Timestamp: {timestamp.timestamp}</p>
              <p>Random ID: {timestamp.random}</p>
            </div>
            <RevalidateTimestampButton />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Cached Quote</CardTitle>
            <CardDescription>
              Uses cacheLife(&quot;hours&quot;) for longer caching. Different cache
              tags allow independent invalidation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <blockquote className="italic text-muted-foreground border-l-2 pl-4">
              {quote}
            </blockquote>
            <RevalidateQuoteButton />
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h2 className="font-semibold mb-2">How it works</h2>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>1. Functions with &apos;use cache&apos; are cached automatically</li>
          <li>2. cacheLife() sets how long the cache is valid</li>
          <li>3. cacheTag() assigns tags for selective revalidation</li>
          <li>4. revalidateTag() invalidates cache entries by tag</li>
        </ul>
      </div>
    </main>
  );
}

