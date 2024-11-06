import { NextRequest, NextResponse } from "next/server";
const protectedRoutes =  ['/home', '/createEvent', '/createService', '/editEvent', '/editService', '/payEvent', '/tickets', '/viewEvent','/viewEventAttendant', '/viewProviders', '/viewRegisterEvent', '/viewService'];


export default function middleware( request: NextRequest){

    const currentUser = request.cookies.get("currentUser")?.value;

    if (!currentUser && protectedRoutes.includes(request.nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    NextResponse.redirect(new URL('/profile', request.nextUrl));
} 


export const config  = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)']
}