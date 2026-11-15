import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal, RevealImage, Stagger } from "@/components/site/motion";
import { ButtonLink, SectionHeader } from "@/components/site/ui";
import { site } from "@/lib/site";

export type NewsItem = {
  id: string | number;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string;
  readTime: string;
  url?: string;
};

const fallbackNews: NewsItem[] = [
  {
    id: 1,
    category: "News",
    title:
      "Leadership Transition: Prof. Dauda Bawa Appointed as New TCoEFS Director",
    excerpt:
      "Outgoing Director, Prof. Amaza, handing over leadership to the newly appointed Director of the TCoEFS, Prof. Dauda Bawa.",
    date: "June 15, 2025",
    readTime: "4 min read",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-V4yLKzwoksrHW9uwr7of9Sj9e41LtL.png",
  },
];

const linkFor = (item: NewsItem) =>
  item.url || `${site.blogUrl}/news/${item.id}`;

export default function News({ items }: { items?: NewsItem[] }) {
  const list = items && items.length > 0 ? items : fallbackNews;
  const [lead, ...rest] = list;
  const secondary = rest.slice(0, 3);

  return (
    <section className="bg-mist py-16 sm:py-20 lg:py-24">
      <div className="shell">
        <SectionHeader
          eyebrow="Latest news"
          index="07"
          title="Developments, partnerships and *impact stories.*"
          aside={
            <div className="mt-2">
              <ButtonLink href={site.blogUrl} variant="ink" icon="up-right">
                View all news
              </ButtonLink>
            </div>
          }
        />

        <a
          href={linkFor(lead)}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-12 grid gap-x-12 gap-y-8 lg:mt-20 lg:grid-cols-12 lg:items-end"
        >
          <RevealImage
            src={lead.image || "/hero/compressed/2.jpg"}
            alt={lead.title}
            sizes="(min-width: 1024px) 58vw, 100vw"
            parallax={5}
            className="aspect-[16/10] rounded-lg bg-forest lg:col-span-7"
            imageClassName="transition-transform duration-500 ease-expo group-hover:scale-[1.04]"
          />
          <Reveal delay={0.1} className="lg:col-span-5 lg:pb-4">
            <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1 text-stone">
              <span className="rounded-full bg-pine px-2.5 py-1.5 text-paper">
                {lead.category}
              </span>
              {lead.date && <span>{lead.date}</span>}
              {lead.readTime && <span className="opacity-60">{lead.readTime}</span>}
            </p>
            <h3 className="display display-md mt-6 text-ink">
              <span className="link-draw pb-1">{lead.title}</span>
            </h3>
            {lead.excerpt && (
              <p className="mt-5 text-[1rem] leading-relaxed text-stone">
                {lead.excerpt}
              </p>
            )}
            <span className="mt-7 inline-flex items-center gap-2 text-[0.9375rem] font-medium text-pine">
              Read the story
              <ArrowUpRight className="size-4 transition-transform duration-500 ease-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </Reveal>
        </a>

        {secondary.length > 0 && (
          <Stagger
            gap={0.1}
            className="mt-12 grid gap-x-8 gap-y-12 border-t border-line pt-12 md:grid-cols-3 lg:mt-20"
          >
            {secondary.map((item) => (
              <a
                key={item.id}
                href={linkFor(item)}
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-forest">
                  <Image
                    src={item.image || "/hero/compressed/2.jpg"}
                    alt={item.title}
                    fill
                    sizes="(min-width: 768px) 30vw, 100vw"
                    className="object-cover transition-transform duration-500 ease-expo group-hover:scale-[1.03]"
                  />
                </div>
                <p className="eyebrow mt-5 flex gap-3 text-stone">
                  <span className="text-pine">{item.category}</span>
                  {item.date && <span>{item.date}</span>}
                </p>
                <h3 className="mt-3 text-[1.125rem] font-semibold leading-snug text-ink">
                  <span className="link-draw pb-0.5">{item.title}</span>
                </h3>
              </a>
            ))}
          </Stagger>
        )}
      </div>
    </section>
  );
}
