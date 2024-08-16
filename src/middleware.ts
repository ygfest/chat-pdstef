import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export { default } from "next-auth/middleware"


withAuth(
  async function middleware(req) {
    const token = await getToken({ req });
    const isAuthenticated = !!token;
    const isAuthPage =
      req.nextUrl.pathname.startsWith("/sign-in") ||
      req.nextUrl.pathname.startsWith("/sign-up") ||
      req.nextUrl.pathname === "/";


    if (isAuthPage) {
      if (isAuthenticated) {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
      return null;
    }

    //redirects the user to feed if the current page is onboarding and the user's onboarded status is true
    if (isAuthenticated) {
      if (token?.onboarded)
        return NextResponse.redirect(new URL("/dashboard", req.url));
      return null;
    }

    //otherwise, redirect the user to onboarding page
   

    if (!isAuthenticated) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
  },
  {
    callbacks: {
      async authorized() {
        // returns true so that the middlewaree fn above is always called
        return true;
      },
    },
  },
);





export const config = { matcher: ["/dashboard", "/main/[id]"] }