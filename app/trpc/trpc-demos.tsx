"use client";

import { useState } from "react";
import { trpc } from "@/lib/trpc/client";
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

// Demo: Simple query with no input
function HelloDemo() {
  const { data, isLoading, refetch } = trpc.example.hello.useQuery();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Simple Query</CardTitle>
        <CardDescription>
          A basic tRPC query with no input parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="font-mono text-sm bg-muted p-3 rounded">
          {isLoading ? "Loading..." : data?.message}
        </p>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Refetch
        </Button>
      </CardContent>
    </Card>
  );
}

// Demo: Query with input validation
function GreetDemo() {
  const [name, setName] = useState("");
  const { data, isLoading } = trpc.example.greet.useQuery(
    { name },
    { enabled: name.length > 0 }
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Query with Input</CardTitle>
        <CardDescription>
          Input is validated with Zod on the server
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="greet-name">Your name</Label>
          <Input
            id="greet-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name..."
          />
        </div>
        {name && (
          <p className="font-mono text-sm bg-muted p-3 rounded">
            {isLoading ? "Loading..." : data?.greeting}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// Demo: Mutation with optimistic updates
function MutationDemo() {
  const [title, setTitle] = useState("");
  const [items, setItems] = useState<
    Array<{ id: string; title: string; createdAt: Date }>
  >([]);

  const mutation = trpc.example.createItem.useMutation({
    onSuccess: (newItem) => {
      setItems((prev) => [...prev, newItem]);
      setTitle("");
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mutation</CardTitle>
        <CardDescription>
          Create items using tRPC mutations with type-safe responses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Item title..."
            onKeyDown={(e) => {
              if (e.key === "Enter" && title) {
                mutation.mutate({ title });
              }
            }}
          />
          <Button
            onClick={() => mutation.mutate({ title })}
            disabled={!title || mutation.isPending}
          >
            {mutation.isPending ? "Adding..." : "Add"}
          </Button>
        </div>

        {items.length > 0 && (
          <ul className="space-y-2">
            {items.map((item) => (
              <li key={item.id} className="text-sm font-mono bg-muted p-2 rounded">
                {item.title}{" "}
                <span className="text-muted-foreground">
                  ({item.createdAt.toLocaleTimeString()})
                </span>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

// Demo: Loading states with slow query
function SlowQueryDemo() {
  const { data, isLoading, isFetching, refetch } =
    trpc.example.slowQuery.useQuery(undefined, {
      refetchOnMount: false,
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loading States</CardTitle>
        <CardDescription>
          TanStack Query provides fine-grained loading states
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="font-mono text-sm bg-muted p-3 rounded">
          {isLoading ? (
            <span>Initial loading...</span>
          ) : isFetching ? (
            <span>Refetching... (cached: {data?.data})</span>
          ) : (
            <span>{data?.data}</span>
          )}
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Refetch (1s delay)
        </Button>
      </CardContent>
    </Card>
  );
}

export function TRPCDemos() {
  return (
    <div className="space-y-6">
      <HelloDemo />
      <GreetDemo />
      <MutationDemo />
      <SlowQueryDemo />
    </div>
  );
}

