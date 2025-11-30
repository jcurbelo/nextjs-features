"use client";

import { useActionState } from "react";
import { greetUser, type FormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// useActionState is the React 19 way to handle form submissions
// It replaces the old pattern of useState + manual submission handling
// https://react.dev/reference/react/useActionState

export function GreetingForm() {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(
    greetUser,
    null
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Server Actions + useActionState</CardTitle>
        <CardDescription>
          Form submissions are handled by a server action. The useActionState
          hook manages pending state and the response.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your name</Label>
            <Input
              id="name"
              name="name"
              placeholder="Enter your name"
              disabled={isPending}
            />
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Sending..." : "Greet me"}
          </Button>

          {state && (
            <p
              className={`text-sm ${state.success ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
            >
              {state.message}
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}

