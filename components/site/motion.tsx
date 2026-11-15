"use client";

import {
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import Image, { type ImageProps } from "next/image";
import {
  Children,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

export const EASE = [0.16, 1, 0.3, 1] as const;

const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

/** Honours the visitor's reduced-motion preference across the whole site. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Fade and rise into place when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  as = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "section" | "article" | "span";
  style?: CSSProperties;
}) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: 0.95, ease: EASE, delay }}
    >
      {children}
    </Tag>
  );
}

/** Reveals each direct child in sequence. */
export function Stagger({
  children,
  className,
  gap = 0.08,
  delay = 0,
  y = 24,
  itemClassName,
}: {
  children: ReactNode;
  className?: string;
  gap?: number;
  delay?: number;
  y?: number;
  itemClassName?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={VIEWPORT}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
    >
      {Children.map(children, (child) => (
        <motion.div
          className={itemClassName}
          variants={{
            hidden: { opacity: 0, y },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.9, ease: EASE },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * Headline reveal: every word slides up from behind a mask.
 * Wrap a word in *asterisks* to set it in italic.
 */
export function SplitText({
  text,
  className,
  delay = 0,
  stagger = 0.045,
  as = "span",
  immediate = false,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  immediate?: boolean;
}) {
  const Tag = motion[as] as typeof motion.span;
  const words = text.split(" ").filter(Boolean);
  let italic = false;

  return (
    <Tag
      className={className}
      aria-label={text.replace(/\*/g, "")}
      initial="hidden"
      {...(immediate
        ? { animate: "show" }
        : { whileInView: "show", viewport: VIEWPORT })}
      variants={{
        hidden: {},
        show: {
          transition: { staggerChildren: stagger, delayChildren: delay },
        },
      }}
    >
      {words.map((raw, i) => {
        const opens = raw.startsWith("*");
        const closes = /\*[.,;:!?]?$/.test(raw);
        if (opens) italic = true;
        const isItalic = italic;
        if (closes) italic = false;
        const word = raw.replace(/\*/g, "");
        return [
          <span
            key={i}
            aria-hidden="true"
            className="inline-block overflow-hidden align-bottom"
            style={{ paddingBottom: "0.14em", marginBottom: "-0.14em" }}
          >
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: "115%" },
                show: { y: 0, transition: { duration: 1.05, ease: EASE } },
              }}
            >
              {isItalic ? <em>{word}</em> : word}
            </motion.span>
          </span>,
          i < words.length - 1 ? " " : null,
        ];
      })}
    </Tag>
  );
}

function ScrubWord({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

/** Statement text whose words light up as the reader scrolls through it. */
export function ScrubText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.45"],
  });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <ScrubWord
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, Math.min(1, (i + 4) / words.length)]}
        >
          {word}
        </ScrubWord>
      ))}
    </p>
  );
}

/** Counts up to a value once it enters the viewport. */
export function Counter({
  value,
  suffix = "",
  className,
  duration = 2.2,
}: {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const count = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration, ease: EASE });
    return () => controls.stop();
  }, [inView, value, duration, count]);

  useEffect(
    () =>
      count.on("change", (latest) => {
        if (ref.current)
          ref.current.textContent =
            Math.round(latest).toLocaleString("en-GB") + suffix;
      }),
    [count, suffix],
  );

  return (
    <span ref={ref} className={className}>
      {value.toLocaleString("en-GB")}
      {suffix}
    </span>
  );
}

/**
 * Photograph that unmasks from the bottom edge while settling from a slight
 * zoom, then drifts gently against the scroll.
 */
export function RevealImage({
  className,
  imageClassName,
  parallax = 6,
  delay = 0,
  alt,
  ...props
}: Omit<ImageProps, "className" | "fill"> & {
  className?: string;
  imageClassName?: string;
  parallax?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [`-${parallax}%`, `${parallax}%`],
  );

  return (
    <motion.div
      ref={ref}
      className={`${/\babsolute\b/.test(className ?? "") ? "" : "relative"} overflow-hidden ${className ?? ""}`}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.25, ease: EASE, delay }}
    >
      <motion.div
        className="absolute inset-x-0"
        style={{ y, top: `-${parallax}%`, bottom: `-${parallax}%` }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.18 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.7, ease: EASE, delay }}
        >
          <Image
            alt={alt}
            fill
            className={`object-cover ${imageClassName ?? ""}`}
            {...props}
          />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** A hairline that draws itself across its container. */
export function DrawRule({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      aria-hidden="true"
      className={`h-px origin-left bg-current ${className ?? ""}`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration: 1.3, ease: EASE, delay }}
    />
  );
}
