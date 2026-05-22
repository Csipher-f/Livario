import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

function getSupabaseAuthCookiePrefix() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const projectRef = new URL(supabaseUrl).hostname.split(".")[0];

  return `sb-${projectRef}-auth-token`;
}

function isRecoverableAuthError(error: { code?: string; message: string }) {
  return (
    error.code === "refresh_token_already_used" ||
    error.message.toLowerCase().includes("invalid refresh token") ||
    error.message.toLowerCase().includes("auth session missing")
  );
}

function clearSupabaseAuthCookies(request: NextRequest, response: NextResponse) {
  const authCookiePrefix = getSupabaseAuthCookiePrefix();
  const cookieNames = request.cookies
    .getAll()
    .map((cookie) => cookie.name)
    .filter((name) => name.startsWith(authCookiePrefix));

  for (const name of cookieNames) {
    request.cookies.delete(name);
    response.cookies.set(name, "", {
      expires: new Date(0),
      path: "/",
    });
  }
}

export async function proxy(request: NextRequest) {
  let response = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value);
          });

          response = NextResponse.next({
            request,
          });

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options);
          });
        },
      },
    }
  );

  const { error } = await supabase.auth.getUser();

  if (error && isRecoverableAuthError(error)) {
    clearSupabaseAuthCookies(request, response);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
