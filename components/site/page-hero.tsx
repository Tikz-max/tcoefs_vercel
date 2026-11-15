import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; href?: string };

/** Opening band for every inner page: breadcrumb, title, lede and photograph. */
export function PageHero({
  crumbs,
  title,
  lede,
  image,
  imageAlt = "",
  imagePosition = "center",
  meta,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  lede?: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  meta?: string[];
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-line bg-mist">
      <div
        className={`shell grid gap-x-12 gap-y-10 py-12 lg:py-16 ${
          image ? "lg:grid-cols-12 lg:items-center" : ""
        }`}
      >
        <div className={image ? "lg:col-span-7" : "max-w-4xl"}>
          <nav
            aria-label="Breadcrumb"
            className="mb-5 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[0.875rem] text-stone"
          >
            <Link href="/" className="hover:text-pine">
              Home
            </Link>
            {crumbs.map((c) => (
              <span key={c.label} className="flex items-center gap-1.5">
                <ChevronRight aria-hidden="true" className="size-3.5 opacity-60" />
                {c.href ? (
                  <Link href={c.href} className="hover:text-pine">
                    {c.label}
                  </Link>
                ) : (
                  <span aria-current="page" className="font-medium text-ink">
                    {c.label}
                  </span>
                )}
              </span>
            ))}
          </nav>

          <h1 className="display display-xl text-ink">
            {title.replace(/\*/g, "")}
          </h1>

          {lede && <p className="lede mt-5 max-w-2xl text-stone">{lede}</p>}

          {meta && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {meta.map((m) => (
                <li
                  key={m}
                  className="rounded-md border border-[#cbd5e1] bg-white px-3 py-1.5 text-[0.8125rem] font-medium text-ink"
                >
                  {m}
                </li>
              ))}
            </ul>
          )}
          {children}
        </div>

        {image && (
          <div className="relative aspect-[3/2] overflow-hidden rounded-lg lg:col-span-5">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="object-cover"
              style={{ objectPosition: imagePosition }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
