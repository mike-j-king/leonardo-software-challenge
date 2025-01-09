import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { serverGetUserDetails } from '@/app/actions/UserDetails'

export async function middleware(request: NextRequest) {
  const userDetails = await serverGetUserDetails()

  if (!userDetails && !request.nextUrl.pathname.startsWith('/login')) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('from', request.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
