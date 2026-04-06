import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  if (pathname === "/핑거핀" || pathname === "/핑거핀/") {
    const url = request.nextUrl.clone()
    url.pathname = "/fingerpin"
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/핑거핀", "/핑거핀/"],
}
