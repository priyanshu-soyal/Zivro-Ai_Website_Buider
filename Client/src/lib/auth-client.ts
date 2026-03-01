import { createAuthClient } from "better-auth/react";

const baseURL = import.meta.env.VITE_BASEURL;

// Validate base URL in production
if (import.meta.env.PROD && !baseURL) {
  console.error(
    "VITE_BASEURL is not set. Authentication will not work properly."
  );
}

export const authClient = createAuthClient({
  /** The base URL of the server */
  baseURL: baseURL,
  fetchOptions: {
    credentials: "include",
  },
});

export const { signIn, signUp, useSession } = authClient;
