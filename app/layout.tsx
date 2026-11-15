import type React from "react";
import type { Metadata, Viewport } from "next";
import "@fontsource/ibm-plex-sans/400.css";
import "@fontsource/ibm-plex-sans/500.css";
import "@fontsource/ibm-plex-sans/600.css";
import "./globals.css";
import { MotionProvider } from "@/components/site/motion";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tcoefs-unijos.org"),
  title: {
    default:
      "TETFund Centre of Excellence in Food Security | University of Jos",
    template: "%s | TCoEFS, University of Jos",
  },
  description:
    "The TETFund Centre of Excellence in Food Security (TCoEFS), University of Jos, advances climate-smart agriculture, postgraduate education, enterprise-driven demonstration, and strategic partnerships for resilient food systems.",
  icons: {
    icon: "/brand/tcoefs-logo.png",
    apple: "/brand/tcoefs-logo.png",
  },
  openGraph: {
    type: "website",
    siteName: "TCoEFS, University of Jos",
    title: "TETFund Centre of Excellence in Food Security",
    description:
      "Research, postgraduate education, enterprise and partnerships for resilient food systems in Nigeria and across Africa.",
    images: ["/hero/compressed/2.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#12294a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://hebbkx1anhila5yf.public.blob.vercel-storage.com"
          crossOrigin=""
        />
      </head>
      <body>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
