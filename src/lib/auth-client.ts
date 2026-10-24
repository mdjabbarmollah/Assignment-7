"use client";

import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL || "https://assignment-7-mu-ebon.vercel.app",
});

export const { signIn, signUp, useSession, signOut } = authClient;