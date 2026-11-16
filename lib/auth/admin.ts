import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isAuthorizedAdmin } from "@/lib/auth/authorized";

/**
 * Guards an admin-only API route. Returns the Supabase client bound to the
 * caller's session (so database row-level security sees the real user) or a
 * ready-made 401/403 response.
 */
export async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return {
      ok: false as const,
      response: NextResponse.json({ error: "Please sign in." }, { status: 401 }),
    };
  }
  if (!isAuthorizedAdmin(user)) {
    return {
      ok: false as const,
      response: NextResponse.json(
        { error: "This account is not an authorised administrator." },
        { status: 403 },
      ),
    };
  }
  return { ok: true as const, supabase, user };
}
