import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  
  // Check if user is authenticated by looking for user data in cookies
  const hasSession = request.cookies.has('user')

  // If there's no session and the user is trying to access a protected route
  if (!hasSession && !request.nextUrl.pathname.startsWith('/auth/')) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/auth/sign-in'
    redirectUrl.searchParams.set('redirectTo', request.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // If there's a session and the user is trying to access auth pages
  if (hasSession && request.nextUrl.pathname.startsWith('/auth/')) {
    const redirectUrl = request.nextUrl.clone()
    redirectUrl.pathname = '/chat/1'
    return NextResponse.redirect(redirectUrl)
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 