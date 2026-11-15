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
  wheat: "bg-wheat text-ink hover:bg-[#f2c84b]",
  ink: "bg-pine text-white hover:bg-leaf",
  pine: "bg-pine text-white hover:bg-leaf",
  "outline-light":
    "border border-white/50 text-white hover:bg-white hover:text-ink",
  "outline-dark":
    "border border-[#cbd5e1] bg-white text-ink hover:border-ink",
} as const;

export type ButtonVariant = keyof typeof buttonVariants;

function ButtonInner({
  children,
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
      <Icon
        aria-hidden="true"
        className="size-4 transition-transform duration-200 group-hover/btn:translate-x-0.5"
      />
    </>
  );
}

export const buttonClass = (variant: ButtonVariant, className = "") =>
  `group/btn inline-flex h-12 items-center justify-center gap-2.5 rounded-md px-6 text-[0.9375rem] font-semibold leading-none transition-colors duration-200 disabled:opacity-60 ${buttonVariants[variant]} ${className}`;

/** Primary call-to-action button. */
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
      className={`group inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold ${className}`}
    >
      <span className="link-draw pb-0.5">{children}</span>
      {icon !== "none" && (
        <Icon className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      )}
    </SmartLink>
  );
}

/** Small uppercase label above a heading. */
export function Eyebrow({
  children,
  tone = "light",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
  index?: string;
}) {
  return (
    <p
      className={`eyebrow ${tone === "dark" ? "text-wheat" : "text-pine"} ${className}`}
    >
      {children}
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
            <Eyebrow tone={tone} index={index} className="mb-4">
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
      className={`relative py-16 sm:py-20 lg:py-24 ${surface} ${className}`}
    >
      <div className="shell relative">{children}</div>
    </section>
  );
}

export { DrawRule };

/** Decorative background removed in the restrained design; kept as a no-op. */
export function Contours(_props: {
  className?: string;
  rings?: number;
  seed?: number;
}) {
  return null;
}
