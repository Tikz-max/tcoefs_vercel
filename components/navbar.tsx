"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { navItems, site, socials, type NavItem } from "@/lib/site";
import { EASE } from "@/components/site/motion";

export { Navbar };

function Brand({ inverse }: { inverse: boolean }) {
  return (
    <Link
      href="/"
      aria-label="TCoEFS home"
      className="group flex items-center gap-3"
    >
      <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white shadow-[0_0_0_1px_rgb(8_23_15_/_0.08)] transition-transform duration-700 ease-expo group-hover:rotate-[8deg]">
        <Image
          src="/brand/tcoefs-logo.png"
          alt=""
          width={72}
          height={62}
          priority
          className="h-auto w-8"
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1.35rem] tracking-[-0.02em]">
          TCoEFS
        </span>
        <span
          className={`eyebrow mt-1 !text-[0.5625rem] transition-colors duration-500 ${
            inverse ? "text-white/60" : "text-stone"
          }`}
        >
          University of Jos
        </span>
      </span>
    </Link>
  );
}

function DesktopItem({
  item,
  pathname,
  inverse,
}: {
  item: NavItem;
  pathname: string;
  inverse: boolean;
}) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = item.children
    ? item.children.some((c) => !c.external && pathname.startsWith(c.href))
    : item.href === pathname;

  const linkClass = `relative flex items-center gap-1 px-3.5 py-2 text-[0.9375rem] transition-opacity duration-300 ${
    active ? "opacity-100" : "opacity-75 hover:opacity-100"
  }`;

  const dot = active ? (
    <span
      aria-hidden="true"
      className={`absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full ${
        inverse ? "bg-wheat" : "bg-wheat-deep"
      }`}
    />
  ) : null;

  if (!item.children) {
    return (
      <Link href={item.href!} className={linkClass}>
        {item.label}
        {dot}
      </Link>
    );
  }

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 140);
  };

  return (
    <div
      className="relative"
      onMouseEnter={show}
      onMouseLeave={hide}
      onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className={linkClass}
      >
        {item.label}
        <ChevronDown
          className={`size-3.5 transition-transform duration-500 ease-expo ${open ? "rotate-180" : ""}`}
        />
        {dot}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="absolute left-1/2 top-full w-[22rem] -translate-x-1/2 pt-4"
            style={{ transformOrigin: "top center" }}
          >
            <div className="overflow-hidden rounded-xl bg-paper p-2 text-ink shadow-[0_30px_80px_-20px_rgb(8_23_15_/_0.45)] ring-1 ring-ink/10">
              {item.children.map((child) => {
                const inner = (
                  <>
                    <span>
                      <span className="block text-[0.9375rem] font-medium">
                        {child.label}
                      </span>
                      {child.description && (
                        <span className="mt-1 block text-[0.8125rem] leading-snug text-stone">
                          {child.description}
                        </span>
                      )}
                    </span>
                    <ArrowUpRight className="mt-0.5 size-4 shrink-0 -translate-x-1 translate-y-1 opacity-0 transition-all duration-500 ease-expo group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
                  </>
                );
                const cls =
                  "group flex items-start justify-between gap-4 rounded-lg px-4 py-3.5 transition-colors duration-300 hover:bg-mist";
                return child.external ? (
                  <a
                    key={child.label}
                    href={child.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cls}
                  >
                    {inner}
                  </a>
                ) : (
                  <Link
                    key={child.label}
                    href={child.href}
                    onClick={() => setOpen(false)}
                    className={cls}
                  >
                    {inner}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const groups: NavItem[] = [{ label: "Home", href: "/" }, ...navItems];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="group flex h-11 items-center gap-3 rounded-full border border-current/25 pl-4 pr-3.5 text-[0.9375rem] font-medium"
        >
          Menu
          <span aria-hidden="true" className="flex w-4 flex-col gap-[5px]">
            <span className="h-px w-full bg-current transition-transform duration-500 ease-expo group-hover:translate-x-0.5" />
            <span className="h-px w-full bg-current transition-transform duration-500 ease-expo group-hover:-translate-x-0.5" />
          </span>
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-0 z-[70] flex flex-col overflow-y-auto bg-ink text-white data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in duration-300"
        >
          <Dialog.Title className="sr-only">Site navigation</Dialog.Title>
          <div className="shell flex h-20 shrink-0 items-center justify-between">
            <Brand inverse />
            <Dialog.Close asChild>
              <button
                type="button"
                className="flex h-11 items-center gap-3 rounded-full border border-white/25 pl-4 pr-3.5 text-[0.9375rem] font-medium"
              >
                Close
                <span aria-hidden="true" className="relative size-4">
                  <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-current" />
                  <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-current" />
                </span>
              </button>
            </Dialog.Close>
          </div>

          <nav aria-label="Primary" className="shell flex-1 pb-10 pt-6">
            <ul>
              {groups.map((item, i) => (
                <motion.li
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.08 + i * 0.05 }}
                  className="border-t border-line-inverse py-5"
                >
                  <div className="flex items-baseline gap-5">
                    <span className="eyebrow w-6 text-wheat">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="display text-[2rem] sm:text-[2.5rem]"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className="display text-[2rem] sm:text-[2.5rem]">
                        {item.label}
                      </span>
                    )}
                  </div>
                  {item.children && (
                    <ul className="ml-11 mt-3 flex flex-wrap gap-x-6 gap-y-2">
                      {item.children
                        .filter((c) => c.href !== item.href)
                        .map((child) =>
                          child.external ? (
                            <li key={child.label}>
                              <a
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-[0.9375rem] text-white/70"
                              >
                                {child.label}
                                <ArrowUpRight className="size-3.5" />
                              </a>
                            </li>
                          ) : (
                            <li key={child.label}>
                              <Link
                                href={child.href}
                                onClick={() => setOpen(false)}
                                className={`text-[0.9375rem] ${
                                  pathname === child.href
                                    ? "text-wheat"
                                    : "text-white/70"
                                }`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ),
                        )}
                    </ul>
                  )}
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE, delay: 0.08 + groups.length * 0.05 }}
                className="border-y border-line-inverse py-5"
              >
                <div className="flex items-baseline gap-5">
                  <span className="eyebrow w-6 text-wheat">
                    {String(groups.length + 1).padStart(2, "0")}
                  </span>
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="display text-[2rem] sm:text-[2.5rem]"
                  >
                    Contact
                  </Link>
                </div>
              </motion.li>
            </ul>
          </nav>

          <div className="shell grid shrink-0 gap-6 pb-8 text-[0.875rem] text-white/60 sm:grid-cols-2">
            <div>
              <a href={`mailto:${site.email}`} className="block text-white">
                {site.email}
              </a>
              <a href={site.phoneHref} className="mt-1 block">
                {site.phone}
              </a>
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 sm:justify-end">
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 480 && y > previous);
  });

  const inverse = !scrolled;

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.6, ease: EASE }}
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow,backdrop-filter] duration-500 ${
        inverse
          ? "bg-transparent text-white"
          : "bg-paper/85 text-ink shadow-[0_1px_0_0_rgb(8_23_15_/_0.08)] backdrop-blur-xl"
      }`}
    >
      <div className="shell flex h-20 items-center justify-between gap-6">
        <Brand inverse={inverse} />

        <nav aria-label="Primary" className="hidden items-center xl:flex">
          {navItems.map((item) => (
            <DesktopItem
              key={item.label}
              item={item}
              pathname={pathname}
              inverse={inverse}
            />
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className={`hidden h-11 items-center rounded-full px-6 text-[0.9375rem] font-medium transition-colors duration-500 sm:inline-flex ${
              inverse
                ? "bg-white text-ink hover:bg-wheat"
                : "bg-ink text-paper hover:bg-pine"
            }`}
          >
            Contact us
          </Link>
          <div className="xl:hidden">
            <MobileMenu pathname={pathname} />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
