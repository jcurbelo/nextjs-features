"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Parse SSE stream from an OpenAI-style API
// https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events

async function* streamChat(prompt: string): AsyncGenerator<string> {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt }),
  });

  if (!response.body) {
    throw new Error("No response body");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() || "";

    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.slice(6);
        if (data === "[DONE]") return;

        try {
          const parsed = JSON.parse(data);
          if (parsed.content) {
            yield parsed.content;
          }
        } catch {
          // Skip malformed chunks
        }
      }
    }
  }
}

export function ChatStream() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const handleSubmit = useCallback(async () => {
    if (!prompt.trim() || isStreaming) return;

    setIsStreaming(true);
    setResponse("");

    try {
      for await (const chunk of streamChat(prompt)) {
        setResponse((prev) => prev + chunk);
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsStreaming(false);
    }
  }, [prompt, isStreaming]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Streaming Chat</CardTitle>
        <CardDescription>
          Simulates an OpenAI-style streaming API. Words appear as they arrive.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type a message..."
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            disabled={isStreaming}
          />
          <Button onClick={handleSubmit} disabled={isStreaming || !prompt.trim()}>
            {isStreaming ? "Streaming..." : "Send"}
          </Button>
        </div>

        {(response || isStreaming) && (
          <div className="min-h-[100px] p-4 bg-muted rounded-lg font-mono text-sm">
            {response}
            {isStreaming && <span className="animate-pulse">|</span>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

