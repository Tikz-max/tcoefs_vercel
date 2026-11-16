// Admin-side editing of homepage pictures and figures (runs in the browser,
// as the signed-in administrator).
import { createClient } from "@/lib/supabase/client";
import type { HeroSlide, SiteStat } from "@/lib/types/database";

const db = createClient();

type Result<T = undefined> = { success: boolean; error?: string; data?: T };

/** Tell the live site to refresh its cached homepage straight away. */
export async function refreshPublicSite(paths: string[] = ["/"]) {
  try {
    await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paths }),
    });
  } catch {
    // The page refreshes on its own within five minutes regardless.
  }
}

/** Upload a picture; the server resizes it and returns its public address. */
export async function uploadImage(file: File): Promise<Result<{ url: string }>> {
  const form = new FormData();
  form.append("file", file);
  try {
    const res = await fetch("/api/media/upload", { method: "POST", body: form });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json.url) {
      return { success: false, error: json.error ?? "Upload failed." };
    }
    return { success: true, data: { url: json.url as string } };
  } catch {
    return { success: false, error: "Could not reach the server." };
  }
}

// ----------------------------------------------------------- hero slides
export async function getAllHeroSlides(): Promise<{
  slides: HeroSlide[];
  missingTable: boolean;
}> {
  const { data, error } = await db
    .from("hero_slides")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) {
    // 42P01 / PGRST205: table not created yet
    const missing = error.code === "42P01" || error.code === "PGRST205";
    if (!missing) console.error("Error loading hero slides:", error);
    return { slides: [], missingTable: missing };
  }
  return { slides: data ?? [], missingTable: false };
}

export async function addHeroSlide(
  slide: { image_url: string; alt_text: string; caption: string },
  order: number,
  updatedBy?: string,
): Promise<Result<HeroSlide>> {
  const { data, error } = await db
    .from("hero_slides")
    .insert([{ ...slide, display_order: order, updated_by: updatedBy ?? null }])
    .select()
    .single();
  if (error) return { success: false, error: error.message };
  return { success: true, data };
}

export async function updateHeroSlide(
  id: string,
  updates: Partial<
    Pick<HeroSlide, "image_url" | "alt_text" | "caption" | "is_active" | "display_order">
  >,
  updatedBy?: string,
): Promise<Result> {
  const { error } = await db
    .from("hero_slides")
    .update({ ...updates, updated_by: updatedBy ?? null })
    .eq("id", id);
  return error ? { success: false, error: error.message } : { success: true };
}

export async function deleteHeroSlide(id: string): Promise<Result> {
  const { error } = await db.from("hero_slides").delete().eq("id", id);
  return error ? { success: false, error: error.message } : { success: true };
}

export async function saveHeroOrder(ids: string[]): Promise<Result> {
  const results = await Promise.all(
    ids.map((id, index) =>
      db.from("hero_slides").update({ display_order: index + 1 }).eq("id", id),
    ),
  );
  const failed = results.find((r) => r.error);
  return failed?.error
    ? { success: false, error: failed.error.message }
    : { success: true };
}

// ----------------------------------------------------------- site figures
export async function getAllSiteStats(): Promise<{
  stats: SiteStat[];
  missingTable: boolean;
}> {
  const { data, error } = await db
    .from("site_stats")
    .select("*")
    .order("display_order", { ascending: true });
  if (error) {
    const missing = error.code === "42P01" || error.code === "PGRST205";
    if (!missing) console.error("Error loading site figures:", error);
    return { stats: [], missingTable: missing };
  }
  return { stats: data ?? [], missingTable: false };
}

export async function saveSiteStat(
  stat: Pick<SiteStat, "label" | "description" | "value" | "suffix">,
  id: string | null,
  order: number,
  updatedBy?: string,
): Promise<Result> {
  const payload = { ...stat, updated_by: updatedBy ?? null };
  const { error } = id
    ? await db.from("site_stats").update(payload).eq("id", id)
    : await db
        .from("site_stats")
        .insert([{ ...payload, display_order: order }]);
  return error ? { success: false, error: error.message } : { success: true };
}

export async function deleteSiteStat(id: string): Promise<Result> {
  const { error } = await db.from("site_stats").delete().eq("id", id);
  return error ? { success: false, error: error.message } : { success: true };
}
