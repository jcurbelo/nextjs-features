"use server";

// Server Actions run exclusively on the server
// They can be called from client components via form actions or directly
// https://react.dev/reference/rsc/server-actions

export type FormState = {
  message: string;
  success: boolean;
} | null;

export async function greetUser(
  _prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Simulate network delay to show pending state
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const name = formData.get("name");

  if (!name || typeof name !== "string" || name.trim() === "") {
    return {
      message: "Name is required",
      success: false,
    };
  }

  // In a real app, you'd save to a database, call an API, etc.
  return {
    message: `Hello, ${name.trim()}! This message came from the server.`,
    success: true,
  };
}

