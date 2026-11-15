import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Counter, Reveal, RevealImage, SplitText } from "@/components/site/motion";
import { Eyebrow } from "@/components/site/ui";

type Tone = "light" | "dark";

/** Editorial index: numbered rows with a serif title and a description. */
export function IndexRows({
  items,
  tone = "light",
  className = "",
}: {
  items: { title: string; description?: string; meta?: string; icon?: LucideIcon }[];
  tone?: Tone;
  className?: string;
}) {
  const dark = tone === "dark";
  const rule = dark ? "border-line-inverse" : "border-line";
  return (
    <ol className={`border-b ${rule} ${className}`}>
      {items.map((item, i) => {
        return (
          <Reveal as="li" key={item.title} delay={i * 0.04} y={18}>
            <div
              className={`group relative grid gap-x-10 gap-y-2 border-t py-7 lg:grid-cols-12 lg:items-baseline ${rule}`}
            >
              <span
                aria-hidden="true"
                className={`absolute inset-x-0 -top-px h-px origin-left scale-x-0 transition-transform duration-300 ease-expo group-hover:scale-x-100 ${dark ? "bg-wheat" : "bg-pine"}`}
              />
              <span
                className={`eyebrow lg:col-span-1 ${dark ? "text-wheat" : "text-wheat-deep"}`}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3
                className={`display display-md transition-transform duration-300 ease-expo lg:col-span-5 ${dark ? "text-white" : "text-ink"}`}
              >
                {item.title}
              </h3>
              <div className="lg:col-span-5 lg:col-start-8">
                {item.description && (
                  <p
                    className={`text-[0.9875rem] leading-relaxed ${dark ? "text-white/65" : "text-stone"}`}
                  >
                    {item.description}
                  </p>
                )}
                {item.meta && (
                  <p
                    className={`mt-4 border-l-2 pl-4 text-[0.9rem] leading-relaxed ${dark ? "border-wheat text-white/80" : "border-wheat-deep text-ink/80"}`}
                  >
                    {item.meta}
                  </p>
                )}
              </div>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}

export type Stat = {
  value?: number;
  display?: string;
  suffix?: string;
  label: string;
  description?: string;
};

/** Large figures separated by hairlines. */
export function StatRow({
  stats,
  tone = "light",
  className = "",
}: {
  stats: Stat[];
  tone?: Tone;
  className?: string;
}) {
  const dark = tone === "dark";
  const cols =
    stats.length === 3 ? "lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-4";
  return (
    <dl
      className={`grid border-t ${dark ? "border-white/40" : "border-ink"} ${cols} ${className}`}
    >
      {stats.map((s, i) => (
        <Reveal
          key={s.label}
          delay={i * 0.08}
          className={`border-b py-8 lg:border-b-0 lg:py-10 ${dark ? "border-line-inverse" : "border-line"} ${
            i > 0 ? "lg:border-l lg:pl-8" : ""
          } ${stats.length !== 3 && i % 2 === 1 ? "sm:border-l sm:pl-8" : ""} sm:pr-8`}
        >
          <dd
            className={`display text-[clamp(3.25rem,5.6vw,5.25rem)] leading-none ${dark ? "text-wheat" : "text-pine"}`}
          >
            {typeof s.value === "number" ? (
              <Counter value={s.value} suffix={s.suffix} />
            ) : (
              s.display
            )}
          </dd>
          <dt
            className={`mt-5 text-[1.0625rem] font-medium leading-snug ${dark ? "text-white" : "text-ink"}`}
          >
            {s.label}
          </dt>
          {s.description && (
            <p
              className={`mt-2 text-[0.9rem] leading-relaxed ${dark ? "text-white/60" : "text-stone"}`}
            >
              {s.description}
            </p>
          )}
        </Reveal>
      ))}
    </dl>
  );
}

/** Grid of ruled cells, each with an icon, title and description. */
export function FeatureGrid({
  items,
  columns = 3,
  tone = "light",
  className = "",
}: {
  items: { icon?: LucideIcon; title: string; description?: string; tag?: string }[];
  columns?: 2 | 3 | 4;
  tone?: Tone;
  className?: string;
}) {
  const dark = tone === "dark";
  const cols = {
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-2 lg:grid-cols-3",
    4: "sm:grid-cols-2 lg:grid-cols-4",
  }[columns];
  return (
    <ul
      className={`grid gap-px overflow-hidden rounded-lg ${dark ? "bg-white/15" : "bg-ink/15"} ${cols} ${className}`}
      style={{ boxShadow: dark ? "0 0 0 1px rgb(255 255 255 / 0.15)" : "0 0 0 1px rgb(8 23 15 / 0.15)" }}
    >
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <li
            key={item.title}
            className={`group relative flex flex-col p-7 transition-colors duration-500 sm:p-9 ${
              dark ? "bg-forest hover:bg-pine" : "bg-paper hover:bg-white"
            }`}
          >
            <Reveal delay={(i % columns) * 0.07} y={16} className="flex h-full flex-col">
              <div className="flex items-start justify-between">
                <span
                  className={`eyebrow ${dark ? "text-wheat" : "text-wheat-deep"}`}
                >
                  {item.tag ?? String(i + 1).padStart(2, "0")}
                </span>
                {Icon && (
                  <Icon
                    strokeWidth={1.2}
                    className={`size-7 transition-transform duration-300 ease-expo group-hover:-translate-y-1 ${dark ? "text-sage" : "text-pine"}`}
                  />
                )}
              </div>
              <h3
                className={`display display-sm mt-12 ${dark ? "text-white" : "text-ink"}`}
              >
                {item.title}
              </h3>
              {item.description && (
                <p
                  className={`mt-3 text-[0.9375rem] leading-relaxed ${dark ? "text-white/65" : "text-stone"}`}
                >
                  {item.description}
                </p>
              )}
            </Reveal>
          </li>
        );
      })}
    </ul>
  );
}

/** Photograph beside a titled block of content. */
export function SplitFeature({
  image,
  imageAlt,
  secondaryImage,
  secondaryAlt = "",
  eyebrow,
  index,
  title,
  children,
  reverse = false,
  tone = "light",
  aspect = "aspect-[4/5]",
  imagePosition,
  badge,
}: {
  image: string;
  imageAlt: string;
  secondaryImage?: string;
  secondaryAlt?: string;
  eyebrow?: string;
  index?: string;
  title: string;
  children: ReactNode;
  reverse?: boolean;
  tone?: Tone;
  aspect?: string;
  imagePosition?: string;
  badge?: { value: string; label: string };
}) {
  const dark = tone === "dark";
  return (
    <div className="grid items-center gap-x-12 gap-y-12 lg:grid-cols-12">
      <div
        className={`relative lg:col-span-6 ${reverse ? "lg:order-2 lg:col-start-7" : ""}`}
      >
        <RevealImage
          src={image}
          alt={imageAlt}
          sizes="(min-width: 1024px) 46vw, 100vw"
          className={`${aspect} rounded-lg bg-forest`}
          imageClassName={imagePosition}
        />
        {secondaryImage && (
          <RevealImage
            src={secondaryImage}
            alt={secondaryAlt}
            sizes="(min-width: 1024px) 18vw, 40vw"
            delay={0.2}
            parallax={10}
            className={`absolute -bottom-8 hidden aspect-[4/3] w-[42%] rounded-lg bg-forest shadow-[0_30px_60px_-20px_rgb(8_23_15_/_0.5)] ring-4 sm:block ${
              dark ? "ring-forest" : "ring-paper"
            } ${reverse ? "-left-6" : "-right-6"}`}
          />
        )}
        {badge && (
          <Reveal
            delay={0.3}
            className={`absolute top-6 rounded-lg bg-wheat px-5 py-4 text-ink ${reverse ? "right-6" : "left-6"}`}
          >
            <p className="display text-[2.25rem] leading-none">{badge.value}</p>
            <p className="eyebrow mt-2">{badge.label}</p>
          </Reveal>
        )}
      </div>
      <div
        className={`lg:col-span-5 ${reverse ? "lg:order-1 lg:col-start-1" : "lg:col-start-8"}`}
      >
        {eyebrow && (
          <Reveal y={12}>
            <Eyebrow tone={tone} index={index} className="mb-6">
              {eyebrow}
            </Eyebrow>
          </Reveal>
        )}
        <SplitText
          as="h2"
          text={title}
          className={`display display-lg block ${dark ? "text-white" : "text-ink"}`}
        />
        <div
          className={`prose-body mt-7 space-y-5 ${dark ? "text-white/70" : "text-stone"}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

/** Body copy paragraph that reveals on scroll. */
export function P({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Reveal delay={delay} y={18} className={className}>
      <p>{children}</p>
    </Reveal>
  );
}

/** Pull statement set large in the display face. */
export function Statement({
  children,
  tone = "light",
  className = "",
}: {
  children: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <SplitText
      as="p"
      stagger={0.02}
      text={children}
      className={`display display-md block ${tone === "dark" ? "text-white" : "text-ink"} ${className}`}
    />
  );
}

/** Closing panel with a statement and one or two actions. */
export function CtaPanel({
  eyebrow,
  title,
  children,
  actions,
  tone = "pine",
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  actions: ReactNode;
  tone?: "pine" | "mist";
}) {
  const dark = tone === "pine";
  return (
    <Reveal>
      <div
        className={`grain relative grid gap-x-12 gap-y-8 overflow-hidden rounded-lg p-9 sm:p-14 lg:grid-cols-12 lg:items-end lg:p-16 ${
          dark ? "bg-pine text-white" : "bg-mist text-ink"
        }`}
      >
        <div className="relative lg:col-span-7">
          {eyebrow && (
            <Eyebrow tone={dark ? "dark" : "light"} className="mb-6">
              {eyebrow}
            </Eyebrow>
          )}
          <h2 className="display display-lg">{title}</h2>
        </div>
        <div className="relative lg:col-span-5">
          {children && (
            <div
              className={`prose-body ${dark ? "text-white/75" : "text-stone"}`}
            >
              {children}
            </div>
          )}
          <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
        </div>
      </div>
    </Reveal>
  );
}
