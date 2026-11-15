import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { DrawRule, Reveal, SplitText } from "@/components/site/motion";

type Tone = "light" | "dark";

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:)/.test(href);
}

function SmartLink({
  href,
  className,
  children,
  download,
}: {
  href: string;
  className?: string;
  children: ReactNode;
  download?: boolean;
}) {
  if (isExternal(href) || href.startsWith("#") || download) {
    const newTab = href.startsWith("http");
    return (
      <a
        href={href}
        className={className}
        download={download}
        target={newTab ? "_blank" : undefined}
        rel={newTab ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

const buttonVariants = {
  wheat: "bg-wheat text-ink hover:bg-white",
  ink: "bg-ink text-paper hover:bg-pine",
  pine: "bg-pine text-paper hover:bg-ink",
  "outline-light":
    "border border-white/30 text-white hover:bg-white hover:text-ink hover:border-white",
  "outline-dark":
    "border border-ink/25 text-ink hover:bg-ink hover:text-paper hover:border-ink",
} as const;

const dotVariants = {
  wheat: "bg-ink text-wheat",
  ink: "bg-wheat text-ink",
  pine: "bg-wheat text-ink",
  "outline-light": "bg-white text-ink group-hover/btn:bg-ink group-hover/btn:text-white",
  "outline-dark": "bg-ink text-paper group-hover/btn:bg-wheat group-hover/btn:text-ink",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

function ButtonInner({
  children,
  variant,
  icon,
}: {
  children: ReactNode;
  variant: ButtonVariant;
  icon?: "right" | "up-right";
}) {
  const Icon = icon === "up-right" ? ArrowUpRight : ArrowRight;
  return (
    <>
      <span>{children}</span>
      <span
        aria-hidden="true"
        className={`relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-full transition-colors duration-500 ${dotVariants[variant]}`}
      >
        <Icon className="size-4 transition-transform duration-500 ease-expo group-hover/btn:translate-x-7" />
        <Icon className="absolute size-4 -translate-x-7 transition-transform duration-500 ease-expo group-hover/btn:translate-x-0" />
      </span>
    </>
  );
}

export const buttonClass = (variant: ButtonVariant, className = "") =>
  `group/btn inline-flex items-center justify-between gap-4 rounded-full py-1.5 pl-6 pr-1.5 text-[0.9375rem] font-medium leading-none transition-colors duration-500 disabled:opacity-60 ${buttonVariants[variant]} ${className}`;

/** Pill call-to-action with a sliding arrow. */
export function ButtonLink({
  href,
  children,
  variant = "ink",
  className,
  icon,
  download,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  icon?: "right" | "up-right";
  download?: boolean;
}) {
  return (
    <SmartLink
      href={href}
      download={download}
      className={buttonClass(variant, className)}
    >
      <ButtonInner variant={variant} icon={icon}>
        {children}
      </ButtonInner>
    </SmartLink>
  );
}

export function SubmitButton({
  children,
  variant = "ink",
  disabled,
  className,
}: {
  children: ReactNode;
  variant?: ButtonVariant;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={buttonClass(variant, className)}
    >
      <ButtonInner variant={variant}>{children}</ButtonInner>
    </button>
  );
}

/** Inline text link with a drawn underline. */
export function TextLink({
  href,
  children,
  className = "",
  icon = "right",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  icon?: "right" | "up-right" | "none";
}) {
  const Icon = icon === "up-right" ? ArrowUpRight : ArrowRight;
  return (
    <SmartLink
      href={href}
      className={`group inline-flex items-center gap-2 text-[0.9375rem] font-medium ${className}`}
    >
      <span className="link-draw pb-0.5">{children}</span>
      {icon !== "none" && (
        <Icon className="size-4 transition-transform duration-500 ease-expo group-hover:translate-x-1" />
      )}
    </SmartLink>
  );
}

/** Mono label with a leading tick mark. */
export function Eyebrow({
  children,
  tone = "light",
  className = "",
  index,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  index?: string;
}) {
  return (
    <p
      className={`eyebrow flex items-center gap-3 ${
        tone === "dark" ? "text-sage" : "text-pine"
      } ${className}`}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-px w-8 ${tone === "dark" ? "bg-wheat" : "bg-wheat-deep"}`}
      />
      {index && <span className="opacity-60">{index}</span>}
      <span>{children}</span>
    </p>
  );
}

/** Standard section opening: label, animated serif title and optional lede. */
export function SectionHeader({
  eyebrow,
  index,
  title,
  lede,
  tone = "light",
  className = "",
  size = "lg",
  aside,
}: {
  eyebrow?: string;
  index?: string;
  title: string;
  lede?: ReactNode;
  tone?: Tone;
  className?: string;
  size?: "md" | "lg" | "xl";
  aside?: ReactNode;
}) {
  const sizeClass =
    size === "xl" ? "display-xl" : size === "md" ? "display-md" : "display-lg";
  return (
    <div
      className={`grid gap-x-12 gap-y-6 lg:grid-cols-12 lg:items-end ${className}`}
    >
      <div className="lg:col-span-7">
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
          className={`display ${sizeClass} block ${tone === "dark" ? "text-white" : "text-ink"}`}
        />
      </div>
      {(lede || aside) && (
        <Reveal delay={0.15} className="lg:col-span-5 lg:pb-2">
          {lede && (
            <p
              className={`lede ${tone === "dark" ? "text-white/70" : "text-stone"}`}
            >
              {lede}
            </p>
          )}
          {aside}
        </Reveal>
      )}
    </div>
  );
}

/** Ruled list with tick marks; each row reveals in turn. */
export function CheckList({
  items,
  tone = "light",
  className = "",
  columns = 1,
}: {
  items: string[];
  tone?: Tone;
  className?: string;
  columns?: 1 | 2;
}) {
  const dark = tone === "dark";
  return (
    <ul
      className={`${columns === 2 ? "grid gap-x-10 sm:grid-cols-2" : ""} ${className}`}
    >
      {items.map((item, i) => (
        <Reveal as="li" key={item} delay={i * 0.05} y={14}>
          <div
            className={`flex items-start gap-4 border-t py-4 ${dark ? "border-line-inverse" : "border-line"}`}
          >
            <span
              className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-full ${dark ? "bg-wheat text-ink" : "bg-pine text-paper"}`}
            >
              <Check className="size-3" strokeWidth={3} />
            </span>
            <span
              className={`text-[0.9875rem] leading-snug ${dark ? "text-white/85" : "text-ink/85"}`}
            >
              {item}
            </span>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}

/** Ruled, numbered list for sequences and commitments. */
export function NumberedList({
  items,
  tone = "light",
  className = "",
}: {
  items: string[];
  tone?: Tone;
  className?: string;
}) {
  const dark = tone === "dark";
  return (
    <ol className={className}>
      {items.map((item, i) => (
        <Reveal as="li" key={item} delay={i * 0.05} y={14}>
          <div
            className={`flex items-baseline gap-6 border-t py-5 ${dark ? "border-line-inverse" : "border-line"}`}
          >
            <span
              className={`eyebrow w-6 shrink-0 ${dark ? "text-wheat" : "text-wheat-deep"}`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`text-[1.0625rem] leading-snug ${dark ? "text-white/90" : "text-ink"}`}
            >
              {item}
            </span>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

/** Section wrapper that sets surface colour and vertical rhythm. */
export function Section({
  children,
  tone = "paper",
  className = "",
  id,
}: {
  children: ReactNode;
  tone?: "paper" | "mist" | "white" | "ink" | "forest" | "pine";
  className?: string;
  id?: string;
}) {
  const surface = {
    paper: "bg-paper text-ink",
    mist: "bg-mist text-ink",
    white: "bg-white text-ink",
    ink: "bg-ink text-white",
    forest: "bg-forest text-white",
    pine: "bg-pine text-white",
  }[tone];
  return (
    <section
      id={id}
      className={`relative py-20 sm:py-28 lg:py-36 ${surface} ${className}`}
    >
      <div className="shell relative">{children}</div>
    </section>
  );
}

export { DrawRule };

/**
 * Contour lines, a nod to the Jos Plateau on which the Centre stands.
 * Deterministic so it renders identically on server and client.
 */
export function Contours({
  className = "",
  rings = 13,
  seed = 1,
}: {
  className?: string;
  rings?: number;
  seed?: number;
}) {
  const paths: string[] = [];
  const points = 72;
  for (let r = 0; r < rings; r++) {
    const base = 46 + r * 38;
    const coords: [number, number][] = [];
    for (let i = 0; i < points; i++) {
      const a = (i / points) * Math.PI * 2;
      const wobble =
        Math.sin(a * 3 + seed * 1.7 + r * 0.22) * (10 + r * 2.6) +
        Math.sin(a * 5 - seed * 0.9 + r * 0.41) * (5 + r * 1.3) +
        Math.cos(a * 2 + seed * 2.3) * (14 + r * 3.1);
      const radius = base + wobble;
      coords.push([
        500 + Math.cos(a) * radius * 1.25,
        500 + Math.sin(a) * radius * 0.9,
      ]);
    }
    const d = coords
      .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
      .join(" ");
    paths.push(`${d} Z`);
  }
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1000 1000"
      fill="none"
      className={`pointer-events-none ${className}`}
      preserveAspectRatio="xMidYMid slice"
    >
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="currentColor"
          strokeWidth={i % 4 === 0 ? 1.4 : 0.7}
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}
