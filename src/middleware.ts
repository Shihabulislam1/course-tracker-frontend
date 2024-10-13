
import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSession } from "@/lib/auth"; // Ensure this imports correctly
import { NextURL } from "next/dist/server/web/next-url";

export async function middleware(request: NextRequest) {
  // Check if in development mode
  if (process.env.NODE_ENV === "development") {
    return NextResponse.next(); // Allow everything in development mode
  }

  const session = await getSession();
  const { pathname } = request.nextUrl;

  // Define the paths that you want to protect
  const protectedRoutes = ['/dashboard', '/dashboard/'];

  // If the user is trying to access a protected route and is not logged in
  if (protectedRoutes.some(route => pathname.startsWith(route)) && !session) {
    const url = new NextURL('/login', request.url);
    return NextResponse.redirect(url); // Redirect to the login page
  }

  // If session exists, update the session
  return await updateSession(request);
}

