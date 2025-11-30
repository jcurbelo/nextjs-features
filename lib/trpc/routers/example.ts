import { z } from "zod";
import { publicProcedure, router } from "../server";

// Example router demonstrating tRPC patterns
// Each procedure is fully typed from input to output

export const exampleRouter = router({
  // Simple query - no input required
  hello: publicProcedure.query(() => {
    return { message: "Hello from tRPC!" };
  }),

  // Query with validated input using Zod
  greet: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .query(({ input }) => {
      return { greeting: `Hello, ${input.name}!` };
    }),

  // Mutation example - typically for creating/updating data
  createItem: publicProcedure
    .input(
      z.object({
        title: z.string().min(1),
        completed: z.boolean().default(false),
      })
    )
    .mutation(({ input }) => {
      // In a real app, you'd save to a database here
      const item = {
        id: crypto.randomUUID(),
        title: input.title,
        completed: input.completed,
        createdAt: new Date(),
      };
      return item;
    }),

  // Simulated async operation
  slowQuery: publicProcedure.query(async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return { data: "This took 1 second to load" };
  }),
});

