import { createClient } from "@supabase/supabase-js";
import {
  defaultHeroSlides,
  defaultStats,
  type HeroSlideView,
  type StatView,
} from "@/lib/content/defaults";

// Read-only, cookie-free access for public pages. Any failure (missing
// table, network) falls back to the built-in defaults so the site never breaks.
function publicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: {
      fetch: (input, init) =>
        fetch(input, { ...init, next: { revalidate: 300 } } as RequestInit),
    },
  });
}

export async function getHeroSlides(): Promise<HeroSlideView[]> {
  try {
    const db = publicClient();
    if (!db) return defaultHeroSlides;
    const { data, error } = await db
      .from("hero_slides")
      .select("image_url, alt_text, caption")
      .eq("is_active", true)
      .order("display_order", { ascending: true });
    if (error || !data || data.length === 0) return defaultHeroSlides;
    return data.map((row) => ({
      src: row.image_url,
      alt: row.alt_text || "",
      caption: row.caption || "",
    }));
  } catch {
    return defaultHeroSlides;
  }
}

export async function getSiteStats(): Promise<StatView[]> {
  try {
    const db = publicClient();
    if (!db) return defaultStats;
    const { data, error } = await db
      .from("site_stats")
      .select("label, description, value, suffix")
      .order("display_order", { ascending: true });
    if (error || !data || data.length === 0) return defaultStats;
    return data.map((row) => ({
      value: Number(row.value) || 0,
      suffix: row.suffix || "",
      label: row.label,
      description: row.description || "",
    }));
  } catch {
    return defaultStats;
  }
}
