import Image from "next/image";
import type { TeamProfile } from "@/lib/data/leadership";

/** Portrait with graceful initials fallback when no photograph is on file. */
export function Portrait({
  profile,
  priority = false,
  sizes = "(min-width: 1024px) 25vw, 50vw",
  className = "",
}: {
  profile: TeamProfile;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  if (profile.image) {
    return (
      <Image
        src={profile.image}
        alt={profile.name}
        fill
        priority={priority}
        sizes={sizes}
        className={`object-cover ${className}`}
        style={{ objectPosition: profile.imagePosition ?? "center top" }}
      />
    );
  }

  const initials = profile.name
    .replace(/^(Assoc\. Prof\.|Prof\.|Dr\.|Mr\.|Mrs\.|Ms\.)\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");

  return (
    <div className="absolute inset-0 grid place-items-center bg-pine">
      <span className="display text-[clamp(2.5rem,5vw,4rem)] text-sage/70">
        {initials}
      </span>
    </div>
  );
}
