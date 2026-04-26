"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetTitle,
} from "@/components/ui/sheet";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef } from "react";

type NavChild = {
  label: string;
  href: string;
  external?: boolean;
};

type NavItem =
  | { label: string; href: string; children?: undefined }
  | { label: string; href?: string; children: NavChild[] };

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About",
    children: [
      { label: "Overview", href: "/about" },
      { label: "Leadership", href: "/about/leadership" },
      { label: "Facilities", href: "/about/facilities" },
    ],
  },
  {
    label: "Programmes",
    href: "/programmes",
    children: [
      { label: "Programmes", href: "/programmes" },
      { label: "Postgraduate Programmes", href: "/programmes/postgraduate" },
      {
        label: "Research & Innovation",
        href: "/programmes/research-innovation",
      },
      { label: "Training & Extension", href: "/programmes/training-extension" },
    ],
  },
  { label: "Enterprise & Demonstration", href: "/enterprise-demonstration" },
  { label: "Partnerships", href: "/partnerships" },
  {
    label: "News & Events",
    children: [
      { label: "News", href: "https://blog.tcoefs-unijos.org", external: true },
      { label: "Newsletters & Events", href: "/news/newsletters-events" },
    ],
  },
  { label: "Resources", href: "/resources" },
];

export { Navbar };

export default function Navbar() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expandedMobile, setExpandedMobile] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = (label: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setOpenDropdown(label);
  };

  const handleMouseLeave = () => {
    leaveTimer.current = setTimeout(() => setOpenDropdown(null), 120);
  };

  const isExactActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href;
  };

  const isParentActive = (children: NavChild[]) => {
    return children.some(
      (child) => !child.external && pathname.startsWith(child.href),
    );
  };

  const toggleMobileSection = (label: string) => {
    setExpandedMobile((prev) => (prev === label ? null : label));
  };

  return (
    <nav
      className="w-full bg-white border-b border-gray-100 px-6 py-4 sticky top-0 z-50"
      suppressHydrationWarning
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 flex-shrink-0"
          aria-label="TCoEFS Home"
        >
          <Image
            src="/brand/tcoefs-logo.png"
            alt="TCoEFS Logo"
            width={44}
            height={44}
            className="rounded-full"
          />
          <span className="text-sm font-semibold" style={{ color: "#2f3e2f" }}>
            TCoEFS
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            if (!item.children) {
              // Single link
              const active = isExactActive(item.href);
              return (
                <div key={item.label} className="relative group px-3 py-2">
                  <Link
                    href={item.href}
                    className="text-sm font-medium transition-colors relative block pb-0.5"
                    style={{ color: active ? "#2f3e2f" : "#4a5b4a" }}
                  >
                    {item.label}
                    {active && (
                      <span
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5 transition-all duration-200 group-hover:opacity-0"
                        style={{ backgroundColor: "#2d5a2d" }}
                      />
                    )}
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </Link>
                </div>
              );
            }

            // Dropdown
            const parentActive =
              isParentActive(item.children) ||
              !!(item.href && isExactActive(item.href));
            const isOpen = openDropdown === item.label;

            return (
              <div
                key={item.label}
                className="relative px-3 py-2"
                onMouseEnter={() => handleMouseEnter(item.label)}
                onMouseLeave={handleMouseLeave}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 text-sm font-medium transition-colors relative pb-0.5 group"
                    style={{
                      color: parentActive || isOpen ? "#2f3e2f" : "#4a5b4a",
                    }}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      className="w-3.5 h-3.5 transition-transform duration-200 flex-shrink-0"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                    {parentActive && !isOpen && (
                      <span
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5"
                        style={{ backgroundColor: "#2d5a2d" }}
                      />
                    )}
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </Link>
                ) : (
                  <button
                    className="flex items-center gap-1 text-sm font-medium transition-colors relative pb-0.5 group"
                    style={{
                      color: parentActive || isOpen ? "#2f3e2f" : "#4a5b4a",
                    }}
                    aria-expanded={isOpen}
                    aria-haspopup="true"
                  >
                    {item.label}
                    <ChevronDown
                      className="w-3.5 h-3.5 transition-transform duration-200 flex-shrink-0"
                      style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      }}
                    />
                    {parentActive && !isOpen && (
                      <span
                        className="absolute -bottom-0.5 left-0 right-0 h-0.5"
                        style={{ backgroundColor: "#2d5a2d" }}
                      />
                    )}
                    <span className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  </button>
                )}

                {/* Dropdown Panel */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 min-w-[220px] transition-all duration-200 ${
                    isOpen
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-1 pointer-events-none"
                  }`}
                  onMouseEnter={() => handleMouseEnter(item.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  {item.children.map((child, childIndex) => {
                    const childActive =
                      !child.external && isExactActive(child.href);
                    const isFirstAndParentLink =
                      childIndex === 0 && item.href && child.href === item.href;
                    if (child.external) {
                      return (
                        <a
                          key={child.label}
                          href={child.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-between px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[#2d5a2d]/5"
                          style={{ color: "#4a5b4a" }}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                          <ArrowUpRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />
                        </a>
                      );
                    }
                    return (
                      <div key={child.label}>
                        <Link
                          href={child.href}
                          className="block px-4 py-2.5 text-sm font-medium transition-colors hover:bg-[#2d5a2d]/5"
                          style={{ color: childActive ? "#2f3e2f" : "#4a5b4a" }}
                          onClick={() => setOpenDropdown(null)}
                        >
                          {child.label}
                          {childActive && (
                            <span className="ml-2 inline-block w-1.5 h-1.5 rounded-full bg-[#2d5a2d] align-middle" />
                          )}
                        </Link>
                        {isFirstAndParentLink && (
                          <div className="mx-4 my-1 h-px bg-gray-100" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="hidden lg:block flex-shrink-0">
          <Link href="/contact">
            <Button className="text-white font-medium px-5 py-2 rounded-full transition-all duration-300 bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] hover:from-[#1e4a1e] hover:to-[#2d5a2d] shadow-md hover:shadow-lg hover:scale-105 text-sm">
              Contact Us
            </Button>
          </Link>
        </div>

        {/* Mobile: Contact + Hamburger */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link href="/contact">
            <Button className="h-9 px-4 text-white font-medium rounded-full transition-all duration-300 bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] hover:from-[#4a5b4a] hover:to-[#2d5a2d] shadow-md text-sm">
              Contact Us
            </Button>
          </Link>

          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                suppressHydrationWarning
              >
                {menuOpen ? (
                  <svg
                    className="w-5 h-5"
                    style={{ color: "#2f3e2f" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    style={{ color: "#2f3e2f" }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                )}
              </button>
            </SheetTrigger>

            <SheetContent side="right" className="bg-white p-0 w-[300px]">
              <SheetTitle className="sr-only">Navigation</SheetTitle>

              <div className="flex flex-col h-full overflow-y-auto">
                <div className="px-6 py-5 border-b border-gray-100">
                  <span
                    className="text-base font-semibold"
                    style={{ color: "#2f3e2f" }}
                  >
                    Menu
                  </span>
                </div>

                <nav className="flex-1 px-3 py-3">
                  {navItems.map((item) => {
                    if (!item.children) {
                      return (
                        <SheetClose asChild key={item.label}>
                          <Link
                            href={item.href}
                            className="block px-3 py-3 text-sm font-medium rounded-lg transition-colors hover:bg-[#2d5a2d]/5"
                            style={{
                              color: isExactActive(item.href)
                                ? "#2f3e2f"
                                : "#4a5b4a",
                            }}
                          >
                            {item.label}
                          </Link>
                        </SheetClose>
                      );
                    }

                    const isExpanded = expandedMobile === item.label;
                    const parentActive = isParentActive(item.children);

                    return (
                      <div key={item.label}>
                        <div className="w-full flex items-center justify-between rounded-lg hover:bg-[#2d5a2d]/5 transition-colors">
                          {item.href ? (
                            <SheetClose asChild>
                              <Link
                                href={item.href}
                                className="flex-1 px-3 py-3 text-sm font-medium text-left"
                                style={{
                                  color:
                                    parentActive || isExpanded
                                      ? "#2f3e2f"
                                      : "#4a5b4a",
                                }}
                              >
                                {item.label}
                              </Link>
                            </SheetClose>
                          ) : (
                            <span
                              className="flex-1 px-3 py-3 text-sm font-medium"
                              style={{
                                color:
                                  parentActive || isExpanded
                                    ? "#2f3e2f"
                                    : "#4a5b4a",
                              }}
                            >
                              {item.label}
                            </span>
                          )}
                          <button
                            onClick={() => toggleMobileSection(item.label)}
                            className="px-3 py-3"
                            aria-label={`${isExpanded ? "Collapse" : "Expand"} ${item.label}`}
                            style={{
                              color:
                                parentActive || isExpanded
                                  ? "#2f3e2f"
                                  : "#4a5b4a",
                            }}
                          >
                            <ChevronDown
                              className="w-4 h-4 transition-transform duration-200 flex-shrink-0"
                              style={{
                                transform: isExpanded
                                  ? "rotate(180deg)"
                                  : "rotate(0deg)",
                              }}
                            />
                          </button>
                        </div>

                        {isExpanded && (
                          <div className="ml-3 mb-1 border-l border-gray-100 pl-3">
                            {item.children.map((child) => {
                              if (child.external) {
                                return (
                                  <SheetClose asChild key={child.label}>
                                    <a
                                      href={child.href}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="flex items-center justify-between px-3 py-2.5 text-sm font-medium rounded-lg transition-colors hover:bg-[#2d5a2d]/5"
                                      style={{ color: "#4a5b4a" }}
                                    >
                                      {child.label}
                                      <ArrowUpRight className="w-3.5 h-3.5 opacity-50 flex-shrink-0" />
                                    </a>
                                  </SheetClose>
                                );
                              }
                              return (
                                <SheetClose asChild key={child.label}>
                                  <Link
                                    href={child.href}
                                    className="block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors hover:bg-[#2d5a2d]/5"
                                    style={{
                                      color: isExactActive(child.href)
                                        ? "#2f3e2f"
                                        : "#4a5b4a",
                                    }}
                                  >
                                    {child.label}
                                  </Link>
                                </SheetClose>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </nav>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
