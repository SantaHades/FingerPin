import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  const decodedPathname = decodeURIComponent(pathname)

  if (decodedPathname === "/핑거핀" || decodedPathname === "/핑거핀/" || decodedPathname.includes("핑거핀") || decodedPathname === "/fp" || decodedPathname === "/전자영수증광고") {
    const url = request.nextUrl.clone()
    url.pathname = "/fingerpin"
    return NextResponse.rewrite(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/:path*"],
}
