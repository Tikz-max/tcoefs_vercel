"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowUpRight, ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { navItems, site, socials, type NavItem } from "@/lib/site";

export { Navbar };

function Brand() {
  return (
    <Link href="/" aria-label="TCoEFS home" className="flex items-center gap-3">
      <Image
        src="/brand/tcoefs-logo.png"
        alt=""
        width={104}
        height={90}
        priority
        className="h-12 w-auto"
      />
      <span className="flex flex-col leading-tight">
        <span className="text-[1.0625rem] font-semibold tracking-[-0.01em] text-ink">
          TCoEFS
        </span>
        <span className="hidden text-[0.75rem] text-stone sm:block">
          TETFund Centre of Excellence in Food Security
        </span>
      </span>
    </Link>
  );
}

function DesktopItem({ item, pathname }: { item: NavItem; pathname: string }) {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const active = item.children
    ? item.children.some((c) => !c.external && pathname.startsWith(c.href))
    : item.href === pathname;

  const linkClass = `relative flex h-full items-center gap-1 px-3.5 text-[0.9375rem] font-medium transition-colors duration-200 ${
    active ? "text-pine" : "text-ink hover:text-pine"
  }`;

  const marker = active ? (
    <span
      aria-hidden="true"
      className="absolute inset-x-3.5 bottom-0 h-0.5 bg-pine"
    />
  ) : null;

  if (!item.children) {
    return (
      <Link href={item.href!} className={linkClass}>
        {item.label}
        {marker}
      </Link>
    );
  }

  const show = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const hide = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div
      className="relative h-full"
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
          className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
        {marker}
      </button>

      {open && (
        <div className="absolute left-0 top-full w-80 pt-px">
          <div className="rounded-b-lg border border-t-0 border-line bg-white p-2 shadow-[0_16px_40px_-12px_rgb(15_23_42_/_0.18)]">
            {item.children.map((child) => {
              const inner = (
                <>
                  <span className="block text-[0.9375rem] font-medium text-ink group-hover:text-pine">
                    {child.label}
                  </span>
                  {child.description && (
                    <span className="mt-0.5 block text-[0.8125rem] leading-snug text-stone">
                      {child.description}
                    </span>
                  )}
                </>
              );
              const cls =
                "group block rounded-md px-3.5 py-3 transition-colors duration-200 hover:bg-mist";
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
        </div>
      )}
    </div>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  const groups: NavItem[] = [
    { label: "Home", href: "/" },
    ...navItems,
    { label: "Contact", href: "/contact" },
  ];

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className="grid size-11 place-items-center rounded-md border border-line text-ink"
        >
          <Menu className="size-5" />
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[60] bg-ink/40" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 right-0 z-[70] flex w-full max-w-sm flex-col overflow-y-auto bg-white shadow-xl data-[state=open]:animate-in data-[state=open]:slide-in-from-right duration-200"
        >
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
            <Dialog.Title className="text-[1rem] font-semibold text-ink">
              Menu
            </Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close menu"
                className="grid size-11 place-items-center rounded-md border border-line text-ink"
              >
                <X className="size-5" />
              </button>
            </Dialog.Close>
          </div>

          <nav aria-label="Primary" className="flex-1 px-5 py-4">
            <ul className="divide-y divide-line">
              {groups.map((item) => (
                <li key={item.label} className="py-3">
                  {item.href ? (
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className={`block py-1.5 text-[1.0625rem] font-semibold ${
                        pathname === item.href ? "text-pine" : "text-ink"
                      }`}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="block py-1.5 text-[1.0625rem] font-semibold text-ink">
                      {item.label}
                    </span>
                  )}
                  {item.children && (
                    <ul className="mt-1 space-y-1 border-l-2 border-line pl-4">
                      {item.children
                        .filter((c) => c.href !== item.href)
                        .map((child) => (
                          <li key={child.label}>
                            {child.external ? (
                              <a
                                href={child.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex min-h-11 items-center gap-1 text-[0.9375rem] text-stone"
                              >
                                {child.label}
                                <ArrowUpRight className="size-3.5" />
                              </a>
                            ) : (
                              <Link
                                href={child.href}
                                onClick={() => setOpen(false)}
                                className={`flex min-h-11 items-center text-[0.9375rem] ${
                                  pathname === child.href
                                    ? "font-medium text-pine"
                                    : "text-stone"
                                }`}
                              >
                                {child.label}
                              </Link>
                            )}
                          </li>
                        ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="shrink-0 border-t border-line bg-mist px-5 py-5 text-[0.875rem] text-stone">
            <a href={`mailto:${site.email}`} className="block font-medium text-ink">
              {site.email}
            </a>
            <a href={site.phoneHref} className="mt-1 block">
              {site.phone}
            </a>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1">
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

  return (
    <header className="sticky top-0 z-50 bg-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-[60] focus:rounded-md focus:bg-pine focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to main content
      </a>
      {/* Utility bar */}
      <div className="hidden bg-forest text-white md:block">
        <div className="shell flex h-9 items-center justify-between text-[0.8125rem]">
          <p className="text-white/80">
            University of Jos, Naraguta Campus, Plateau State, Nigeria
          </p>
          <div className="flex items-center gap-6">
            <a
              href={`mailto:${site.email}`}
              className="flex items-center gap-2 text-white/90 hover:text-white"
            >
              <Mail className="size-3.5" />
              {site.email}
            </a>
            <a
              href={site.phoneHref}
              className="flex items-center gap-2 text-white/90 hover:text-white"
            >
              <Phone className="size-3.5" />
              {site.phone}
            </a>
          </div>
        </div>
      </div>

      <div className="border-b border-line">
        <div className="shell flex h-[4.5rem] items-center justify-between gap-6">
          <Brand />

          <nav aria-label="Primary" className="hidden h-full items-center xl:flex">
            {navItems.map((item) => (
              <DesktopItem key={item.label} item={item} pathname={pathname} />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden h-11 items-center rounded-md bg-pine px-5 text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-leaf sm:inline-flex"
            >
              Contact us
            </Link>
            <div className="xl:hidden">
              <MobileMenu pathname={pathname} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
