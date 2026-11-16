import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/auth/admin";

export const runtime = "nodejs";

// Pages whose content comes from the admin dashboard.
const ALLOWED = new Set(["/", "/resources", "/news/newsletters-events"]);

/** Admin-only: refresh cached public pages right after content is saved. */
export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (!auth.ok) return auth.response;

  let paths: string[] = ["/"];
  try {
    const body = await request.json();
    if (Array.isArray(body?.paths)) paths = body.paths;
  } catch {
    // default to the homepage
  }
  const refreshed = paths.filter((p) => ALLOWED.has(p));
  refreshed.forEach((p) => revalidatePath(p));
  return NextResponse.json({ success: true, refreshed });
}
