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

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export { Navbar };

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path === "/about" && pathname === "/about") return true;
    if (path === "/research-innovation" && pathname === "/research-innovation")
      return true;
    if (
      path === "/training-capacity-building" &&
      pathname === "/training-capacity-building"
    )
      return true;

    if (
      path !== "/" &&
      path !== "/about" &&
      path !== "/research" &&
      pathname.startsWith(path)
    )
      return true;
    return false;
  };

  return (
    <nav className="w-full bg-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo and Title Section */}
        <Link
          href="/"
          className="flex items-center gap-3"
          aria-label="TCoEFS Home"
        >
          <Image
            src="/brand/tcoefs-logo.png"
            alt="TCoEFS Logo"
            width={48}
            height={48}
            className="rounded-full"
          />
          <span className="text-xl font-semibold" style={{ color: "#2f3e2f" }}>
            TCoEFS
          </span>
        </Link>

        {/* Navigation Links and Contact Us Button - Centered */}
        <div className="hidden lg:flex items-center gap-8">
          <div className="relative group">
            <Link
              href="/"
              className="text-base font-medium transition-colors hover:opacity-80 pb-2 relative block group-hover:opacity-80"
              style={{ color: isActive("/") ? "#2f3e2f" : "#4a5b4a" }}
            >
              Home
              {isActive("/") && (
                <div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 transition-all duration-200 group-hover:opacity-0"
                  style={{ backgroundColor: "#2d5a2d" }}
                ></div>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>
          </div>

          <div className="relative group">
            <Link
              href="/about"
              className="text-base font-medium transition-colors hover:opacity-80 pb-2 relative block group-hover:opacity-80"
              style={{ color: isActive("/about") ? "#2f3e2f" : "#4a5b4a" }}
            >
              About
              {isActive("/about") && (
                <div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 transition-all duration-200 group-hover:opacity-0"
                  style={{ backgroundColor: "#2d5a2d" }}
                ></div>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </Link>
          </div>

          {[
            { label: "Research & Innovation", href: "/research-innovation" },
            {
              label: "Training & Capacity Building",
              href: "/training-capacity-building",
            },
            { label: "News & Events", href: "/news-events" },
          ].map(({ label, href }) => (
            <div key={label} className="relative group">
              <Link
                href={href}
                className="text-base font-medium transition-colors hover:opacity-80 pb-2 relative block group-hover:opacity-80"
                style={{ color: isActive(href) ? "#2f3e2f" : "#4a5b4a" }}
              >
                {label}
                {isActive(href) && (
                  <div
                    className="absolute -bottom-1 left-0 right-0 h-0.5 transition-all duration-200 group-hover:opacity-0"
                    style={{ backgroundColor: "#2d5a2d" }}
                  ></div>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#5a7c65] to-[#f4c542] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </Link>
            </div>
          ))}

          <Link href="/contact">
            <Button className="text-white font-medium px-6 py-2 rounded-full hover:opacity-90 transition-all duration-300 bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] hover:from-[#4a5b4a] hover:to-[#2d5a2d] shadow-lg hover:shadow-xl transform hover:scale-105">
              Contact Us
            </Button>
          </Link>
        </div>

        {/* Mobile Actions: Contact + Menu */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link href="/contact">
            <Button className="h-9 px-4 text-white font-medium rounded-full hover:opacity-90 transition-all duration-300 bg-gradient-to-r from-[#2d5a2d] to-[#4a5b4a] hover:from-[#4a5b4a] hover:to-[#2d5a2d] shadow-md">
              Contact Us
            </Button>
          </Link>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetTrigger asChild>
              <button
                className="p-2"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? (
                  <svg
                    className="w-6 h-6"
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
                    className="w-6 h-6"
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
            <SheetContent side="right" className="bg-white p-6">
              <SheetTitle className="sr-only">Navigation</SheetTitle>
              <nav className="flex flex-col -mx-6 divide-y divide-gray-200">
                <SheetClose asChild>
                  <Link
                    href="/"
                    className="block text-center py-4 text-gray-600 hover:text-[#2f3e2f]"
                  >
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/about"
                    className="block text-center py-4 text-gray-600 hover:text-[#2f3e2f]"
                  >
                    About
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/research-innovation"
                    className="block text-center py-4 text-gray-600 hover:text-[#2f3e2f]"
                  >
                    Research & Innovation
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/training-capacity-building"
                    className="block text-center py-4 text-gray-600 hover:text-[#2f3e2f]"
                  >
                    Training & Capacity Building
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/news-events"
                    className="block text-center py-4 text-gray-600 hover:text-[#2f3e2f]"
                  >
                    News & Events
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
