"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ShieldAlert } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function UnauthorizedPage() {
  const supabase = createClient();

  useEffect(() => {
    // Make sure an unauthorised account is not left signed in.
    supabase.auth.signOut();
  }, [supabase]);

  return (
    <main className="grid min-h-screen place-items-center bg-mist px-5 py-12">
      <div className="w-full max-w-md rounded-lg border border-line bg-white p-8 text-center shadow-[0_16px_40px_-20px_rgb(15_23_42_/_0.25)] sm:p-10">
        <span className="mx-auto grid size-14 place-items-center rounded-full bg-red-50 text-red-700">
          <ShieldAlert className="size-7" />
        </span>
        <h1 className="mt-5 text-[1.5rem] font-semibold text-ink">
          Access denied
        </h1>
        <p className="mt-3 text-[0.9375rem] leading-relaxed text-stone">
          This GitHub account is not on the list of authorised administrators
          for the TCoEFS dashboard. If you should have access, send the site
          administrator your GitHub username.
        </p>
        <div className="mt-8 grid gap-3">
          <Link
            href="/login"
            className="inline-flex h-12 items-center justify-center rounded-md bg-pine text-[0.9375rem] font-semibold text-white hover:bg-leaf"
          >
            Try a different account
          </Link>
          <Link
            href="/"
            className="inline-flex h-12 items-center justify-center rounded-md border border-[#cbd5e1] text-[0.9375rem] font-semibold text-ink hover:border-ink"
          >
            Back to the website
          </Link>
        </div>
      </div>
    </main>
  );
}
