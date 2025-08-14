import type { TStrapiResponse } from "@/types";
// import { getAuthToken } from "./api/services/get-token";

/**
 * Fetch with timeout to prevent requests from hanging indefinitely
 * 
 * Problem it solves:
 * - Slow/broken servers can cause requests to hang forever
 * - This blocks the UI and creates poor user experience
 * 
 * How it works:
 * - AbortController allows us to cancel the fetch request
 * - setTimeout triggers the abort after the specified time
 * - This ensures requests complete within a reasonable timeframe
 */

export async function fetchWithTimeout(
  input: RequestInfo,
  init: RequestInit = {},
  timeoutMs = 8000 // 8 seconds default - good balance between patience and UX
): Promise<Response> {
  // Create controller to manage request cancellation
  const controller = new AbortController();
  
  // Set up automatic cancellation after timeout period
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(input, {
      ...init,
      signal: controller.signal, // Connect the abort signal to fetch
    });
    return response;
  } finally {
    // Always clean up the timeout to prevent memory leaks
    // This runs whether the request succeeds, fails, or times out
    clearTimeout(timeout);
  }
}

export async function fetchData<T>(url: string): Promise<TStrapiResponse<T>> {
  // const authToken = await getAuthToken();

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  // if (authToken) {
  //   headers["Authorization"] = `Bearer ${authToken}`;
  // }

  try {
    const response = await fetchWithTimeout(url, {
      method: "GET",
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      // If Strapi returns a structured error, pass it back as-is
      return data;
    }

    return data;
  } catch (error) {
    if ((error as Error).name === "AbortError") {
      return {
        error: {
          status: 408,
          name: "TimeoutError",
          message: "The request timed out. Please try again.",
        },
        success: false,
        status: 408,
      } as TStrapiResponse<T>;
    }
    console.error("Fetch error:", error);
    return {
      error: {
        status: 500,
        name: "FetchError",
        message: error instanceof Error ? error.message : "Something went wrong",
      },
      success: false,
      status: 500,
    };
  }
}
