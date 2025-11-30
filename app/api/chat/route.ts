// Simulated OpenAI-style streaming API endpoint
// Uses Web Streams API to send data incrementally
// https://nextjs.org/docs/app/building-your-application/routing/route-handlers

const responses = [
  "Hello! I'm a simulated AI assistant.",
  "I can help you understand how streaming works in Next.js.",
  "This response is being sent word by word, just like OpenAI's API.",
  "Each chunk arrives as soon as it's ready, providing a smooth UX.",
];

export async function POST(request: Request) {
  const { prompt } = await request.json();

  // Pick a response based on prompt or use default
  const responseText = prompt?.toLowerCase().includes("help")
    ? responses[1]
    : responses[Math.floor(Math.random() * responses.length)];

  const words = responseText.split(" ");

  // Create a readable stream that sends words incrementally
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();

      for (const word of words) {
        // Simulate thinking time between words
        await new Promise((resolve) => setTimeout(resolve, 100));

        // Send word as SSE-formatted chunk (like OpenAI)
        const chunk = `data: ${JSON.stringify({ content: `${word} ` })}\n\n`;
        controller.enqueue(encoder.encode(chunk));
      }

      // Signal completion
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}

