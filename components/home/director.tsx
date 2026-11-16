import { Portrait } from "@/components/site/profile";
import { ButtonLink, Eyebrow, TextLink } from "@/components/site/ui";
import { Reveal } from "@/components/site/motion";
import { deputies, director } from "@/lib/data/leadership";

/** Introduces the Director and deputies, drawn from the leadership data. */
export default function Director() {
  // First two sentences of the published executive profile. Sentence ends
  // must follow a full word so "Prof." and initials do not split the text.
  const profile = director.featuredSummary ?? "";
  const match = profile.match(/^([\s\S]*?[a-z0-9]{4}\.)\s+([\s\S]*?[a-z0-9]{4}\.)(?:\s|$)/);
  const summary = match ? `${match[1]} ${match[2]}` : profile;

  return (
    <section className="bg-mist py-16 sm:py-20 lg:py-24">
      <div className="shell grid gap-x-12 gap-y-10 lg:grid-cols-12 lg:items-center">
        <Reveal className="lg:col-span-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-white">
            <Portrait
              profile={director}
              sizes="(min-width: 1024px) 30vw, 100vw"
            />
          </div>
        </Reveal>
        <Reveal className="lg:col-span-7 lg:col-start-6">
          <Eyebrow className="mb-4">Leadership</Eyebrow>
          <h2 className="display display-lg text-ink">{director.name}</h2>
          <p className="mt-2 text-[1.0625rem] font-medium text-pine">
            {director.role}, TCoEFS
          </p>
          <p className="prose-body mt-6 max-w-2xl text-stone">{summary}</p>

          <ul className="mt-8 grid gap-4 border-t border-[#cbd5e1] pt-6 sm:grid-cols-2">
            {deputies.map((d) => (
              <li key={d.slug}>
                <p className="text-[1rem] font-semibold text-ink">{d.name}</p>
                <p className="mt-0.5 text-[0.875rem] text-stone">{d.role}</p>
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <ButtonLink href="/about/leadership" variant="ink">
              Meet the leadership team
            </ButtonLink>
            <TextLink
              href={`/about/leadership/${director.slug}`}
              className="text-pine"
            >
              Director's profile
            </TextLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
