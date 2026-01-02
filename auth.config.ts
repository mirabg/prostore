import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

// Auth config for middleware (edge runtime compatible)
export const authConfig = {
  pages: {
    signIn: "/sign-in",
    error: "/sign-in",
  },
  callbacks: {
    authorized({ request, auth }) {
      // Check for session cart cookie
      if (!request.cookies.get("sessionCartId")) {
        //Generate new session cart id cookie
        const sessionCartId = crypto.randomUUID();

        // Clone the request headers
        const newRequestHeaders = new Headers(request.headers);
        //Create new response and add the new headers
        const response = NextResponse.next({
          request: {
            headers: newRequestHeaders,
          },
        });

        //Set newly generated session cart id in the response cookies
        response.cookies.set("sessionCartId", sessionCartId);
        return response;
      } else {
        return true;
      }
    },
  },
  providers: [], // Add providers in auth.ts for API routes
  trustHost: true,
} satisfies NextAuthConfig;
