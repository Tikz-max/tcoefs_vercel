import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: "TCoEFS",
  description:
    "TETFUND Centre of Excellence in Food Security (TCoEFS), University of Jos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="preconnect"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com"
          crossOrigin=""
        />
        <link rel="icon" href="/brand/tcoefs-logo.png" type="image/png" />
        <link
          rel="alternate icon"
          href="/brand/tcoefs-logo.png"
          type="image/png"
        />
        <link rel="apple-touch-icon" href="/brand/tcoefs-logo.png" />
        <meta name="theme-color" content="#2d5a2d" />
        <style>{`
html {
  font-family: ${GeistSans.style.fontFamily};
  --font-sans: ${GeistSans.variable};
  --font-mono: ${GeistMono.variable};
}
        `}</style>
      </head>
      <body>{children}</body>
    </html>
  );
}
