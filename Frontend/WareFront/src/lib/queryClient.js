import { QueryClient } from "@tanstack/react-query";
export const queryClient = new QueryClient();

// common API request helper function
export async function apiRequest(url, options = {}) {
  const response = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.statusText}`);
  }

  return response.json();
}
