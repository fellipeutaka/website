export { createMiddleware as default } from "@utaka/i18n/middleware";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public folder)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|images).*)",
  ],
};
