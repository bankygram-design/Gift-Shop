import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isAdminRoute = path.startsWith("/admin");

  // Maintenance mode: shoppers see the maintenance page. The admin area stays
  // reachable so the store owner can still log in. Turn it on by setting
  // MAINTENANCE_MODE=true in Vercel (Production environment) and redeploying.
  if (
    process.env.MAINTENANCE_MODE === "true" &&
    !isAdminRoute &&
    path !== "/maintenance"
  ) {
    return NextResponse.rewrite(new URL("/maintenance", request.url));
  }

  // Shoppers on normal pages don't need auth checks.
  if (!isAdminRoute) return NextResponse.next();

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(
          cookiesToSet: { name: string; value: string; options?: CookieOptions }[]
        ) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isLoginPage = path === "/admin/login";

  let isAdmin = false;
  if (user) {
    const { data: adminRow } = await supabase
      .from("admin_users")
      .select("id")
      .eq("id", user.id)
      .single();
    isAdmin = Boolean(adminRow);
  }

  if (!isAdmin && !isLoginPage) {
    const loginUrl = new URL("/admin/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdmin && isLoginPage) {
    const dashboardUrl = new URL("/admin", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return response;
}

export const config = {
  // Run on every page, but skip Next.js internals and static files
  // (anything with a file extension, like .png or .ico).
  matcher: ["/((?!_next/static|_next/image|.*\\..*).*)"],
};
