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

  const response = NextResponse.next()
  response.headers.set('x-user-details', JSON.stringify(userDetails))

  return response
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
