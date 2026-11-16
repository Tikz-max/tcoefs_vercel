// Hosts for which Next.js image optimisation is configured (see next.config.mjs).
const STATIC_HOSTS = [
  "hebbkx1anhila5yf.public.blob.vercel-storage.com",
  "blog.tcoefs-unijos.org",
  "res.cloudinary.com",
];

function hostOf(url?: string): string | null {
  try {
    return url ? new URL(url).hostname : null;
  } catch {
    return null;
  }
}

const r2Host = hostOf(process.env.NEXT_PUBLIC_R2_PUBLIC_BASE_URL?.trim());

/**
 * True when next/image may optimise this source. Anything else (an unknown
 * host pasted into the admin) is served as-is instead of crashing the page.
 */
export function canOptimise(src: string): boolean {
  if (!/^https?:\/\//i.test(src)) return true; // local file
  const host = hostOf(src);
  return !!host && (STATIC_HOSTS.includes(host) || host === r2Host);
}
