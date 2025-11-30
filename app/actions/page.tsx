import Link from "next/link";
import { GreetingForm } from "./greeting-form";

export default function ActionsPage() {
  return (
    <main className="min-h-screen p-8 max-w-2xl mx-auto">
      <div className="mb-8">
        <Link href="/" className="text-sm text-muted-foreground hover:underline">
          Back to home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-2">Server Actions</h1>
      <p className="text-muted-foreground mb-8">
        Server Actions are async functions that run on the server. They can be
        used in forms and called directly from client components.
      </p>

      <GreetingForm />

      <div className="mt-8 p-4 bg-muted rounded-lg">
        <h2 className="font-semibold mb-2">How it works</h2>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>
            1. The form uses <code>action=&#123;formAction&#125;</code> instead of
            onSubmit
          </li>
          <li>
            2. <code>useActionState</code> returns [state, formAction, isPending]
          </li>
          <li>3. The server action receives previous state and FormData</li>
          <li>4. isPending is true while the action is running</li>
        </ul>
      </div>
    </main>
  );
}

