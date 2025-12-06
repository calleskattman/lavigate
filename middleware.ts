import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Already lowercase → no redirect
  if (pathname === pathname.toLowerCase()) {
    return NextResponse.next();
  }

  // lowercase redirect
  const lowercased = `${pathname.toLowerCase()}${search}`;
  return NextResponse.redirect(new URL(lowercased, request.url));
}

// Apply to all routes except static assets & special files
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|manifest.json).*)',
  ],
};
