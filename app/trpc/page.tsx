import Link from "next/link";
import { TRPCDemos } from "./trpc-demos";

export default function TRPCPage() {
  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="text-sm text-muted-foreground hover:underline">
          Back to home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">tRPC + TanStack Query</h1>
      <p className="text-muted-foreground mb-8">
        End-to-end typesafe APIs with tRPC and TanStack Query for async state
        management. Types flow from server to client automatically.
      </p>

      <TRPCDemos />

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h2 className="font-semibold mb-2">How it works</h2>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>1. Define procedures in <code>lib/trpc/routers/</code></li>
          <li>2. Use Zod for input validation - errors are typed</li>
          <li>3. Import <code>trpc</code> client and call hooks</li>
          <li>4. Types are inferred from server to client</li>
        </ul>
      </div>
    </main>
  );
}

