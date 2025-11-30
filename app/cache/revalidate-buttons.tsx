"use client";

import { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { revalidateTimestamp, revalidateQuote } from "./revalidate-actions";

// useTransition lets us show pending state during server action execution
// without blocking the UI

export function RevalidateTimestampButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isPending}
      onClick={() => startTransition(() => revalidateTimestamp())}
    >
      {isPending ? "Revalidating..." : "Revalidate timestamp"}
    </Button>
  );
}

export function RevalidateQuoteButton() {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      variant="outline"
      size="sm"
      disabled={isPending}
      onClick={() => startTransition(() => revalidateQuote())}
    >
      {isPending ? "Revalidating..." : "Revalidate quote"}
    </Button>
  );
}

