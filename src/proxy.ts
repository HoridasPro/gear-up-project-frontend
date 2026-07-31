import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt,{JwtPayload} from "jsonwebtoken"

// This function can be marked `async` if using `await` inside
const AUTH_ROUTES=["/login","/register"]
export function proxy(request: NextRequest) {
  const pathname=request.nextUrl.pathname
   
  const accessToken=request.cookies.get("accessToken")?.value
  const decodedToken=accessToken?jwt.decode(accessToken) as JwtPayload : null
  let userRole=null
  if(decodedToken){
    userRole=decodedToken.role
  }
  if(accessToken && AUTH_ROUTES.includes(pathname)){
    if(userRole==="CUSTOMER"){
      return NextResponse.redirect(new URL("/dashboard",request.url))
    }else if(userRole==="PROVIDER"){
return NextResponse.redirect(new URL("/provider-dashboard",request.url))
    }
    else if(userRole==="ADMIN"){
return NextResponse.redirect(new URL("/admin-dashboard",request.url))
    }
    else{
return NextResponse.redirect(new URL("/",request.url))
    }
  }
  return NextResponse.next()
}

// Alternatively, you can use a default export:
// export default function proxy(request: NextRequest) { ... }

export const config = {
  matcher:  ['/((?!api|_next/static|favicon.ico|_next/image|.*\\.png$).*)',]
};
