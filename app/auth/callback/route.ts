import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { isAuthorizedAdmin } from "@/lib/auth/authorized";

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const origin = requestUrl.origin;

  // The sign-in provider reported a problem: show it on the login page.
  const providerError = requestUrl.searchParams.get("error");
  if (providerError) {
    const login = new URL("/login", origin);
    login.searchParams.set("error", providerError);
    const description = requestUrl.searchParams.get("error_description");
    if (description) login.searchParams.set("error_description", description);
    return NextResponse.redirect(login);
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("Error exchanging code for session:", error);
      return NextResponse.redirect(`${origin}/login?error=auth_failed`);
    }

    // Get user to check authorization
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      if (!isAuthorizedAdmin(user)) {
        // User is not authorized, sign them out
        await supabase.auth.signOut();
        return NextResponse.redirect(`${origin}/unauthorized`);
      }
    }
  }

  // URL to redirect to after sign in process completes
  return NextResponse.redirect(`${origin}/admin`);
}
