import Link from "next/link";
import { ChatStream } from "./chat-stream";

export default function StreamingPage() {
  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="text-sm text-muted-foreground hover:underline">
          Back to home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">SSR Streaming</h1>
      <p className="text-muted-foreground mb-8">
        Server-Sent Events (SSE) for real-time streaming responses. This pattern
        is used by OpenAI, Anthropic, and other AI APIs.
      </p>

      <ChatStream />

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h2 className="font-semibold mb-2">How it works</h2>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>1. Route handler creates a ReadableStream</li>
          <li>2. Data is sent as SSE format: <code>data: &#123;json&#125;\n\n</code></li>
          <li>3. Client uses <code>response.body.getReader()</code></li>
          <li>4. Async generator yields chunks as they arrive</li>
          <li>5. <code>[DONE]</code> signals stream completion</li>
        </ul>
      </div>

      <div className="mt-6 p-4 border rounded-lg">
        <h2 className="font-semibold mb-2">Use cases</h2>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>- AI chat interfaces (ChatGPT, Claude)</li>
          <li>- Live log streaming</li>
          <li>- Real-time data feeds</li>
          <li>- Progress indicators for long operations</li>
        </ul>
      </div>
    </main>
  );
}

