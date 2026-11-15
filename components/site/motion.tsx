"use client";

import {
  MotionConfig,
  animate,
  motion,
  useInView,
  useMotionValue,
} from "motion/react";
import Image, { type ImageProps } from "next/image";
import {
  Children,
  createElement,
  useEffect,
  useRef,
  type CSSProperties,
  type ReactNode,
} from "react";

/**
 * Motion is deliberately restrained: one short fade-and-rise as content
 * enters the viewport, and quick hover transitions. Nothing else moves.
 */
export const EASE = [0.25, 0.1, 0.25, 1] as const;

const VIEWPORT = { once: true, margin: "0px 0px -8% 0px" } as const;
const DURATION = 0.4;

/** Honours the visitor's reduced-motion preference across the whole site. */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Short fade and rise when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
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
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={VIEWPORT}
      transition={{ duration: DURATION, ease: EASE, delay: Math.min(delay, 0.2) }}
    >
      {children}
    </Tag>
  );
}

/** Reveals each direct child with a slight offset in time. */
export function Stagger({
  children,
  className,
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
        show: { transition: { staggerChildren: 0.05 } },
      }}
    >
      {Children.map(children, (child) => (
        <motion.div
          className={itemClassName}
          variants={{
            hidden: { opacity: 0, y: 12 },
            show: {
              opacity: 1,
              y: 0,
              transition: { duration: DURATION, ease: EASE },
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

/** Renders heading text. Asterisks in the source text are ignored. */
export function SplitText({
  text,
  className,
  as = "span",
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "span" | "h1" | "h2" | "h3" | "p";
  immediate?: boolean;
}) {
  return createElement(as, { className }, text.replace(/\*/g, ""));
}

/** Statement paragraph. */
export function ScrubText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return <p className={className}>{text}</p>;
}

/** Counts up to a value once it enters the viewport. */
export function Counter({
  value,
  suffix = "",
  className,
  duration = 1.2,
}: {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const count = useMotionValue(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration, ease: "easeOut" });
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

/** Photograph in a fixed frame. */
export function RevealImage({
  className,
  imageClassName,
  alt,
  parallax: _parallax,
  delay: _delay,
  ...props
}: Omit<ImageProps, "className" | "fill"> & {
  className?: string;
  imageClassName?: string;
  parallax?: number;
  delay?: number;
}) {
  return (
    <div
      className={`${/\babsolute\b/.test(className ?? "") ? "" : "relative"} overflow-hidden ${className ?? ""}`}
    >
      <Image
        alt={alt}
        fill
        className={`object-cover ${imageClassName ?? ""}`}
        {...props}
      />
    </div>
  );
}

/** A hairline rule. */
export function DrawRule({ className }: { className?: string; delay?: number }) {
  return (
    <div aria-hidden="true" className={`h-px bg-current ${className ?? ""}`} />
  );
}
