"use client";

import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Github, Loader2, TriangleAlert } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

function describeError(code: string | null, detail: string | null) {
  if (!code) return null;
  if (code === "auth_failed") {
    return "Sign-in could not be completed. Please try again.";
  }
  if (code === "access_denied") {
    return "GitHub sign-in was cancelled.";
  }
  return (
    detail ||
    "GitHub sign-in failed on the authentication service. Please try again, or contact the site administrator."
  );
}

function LoginForm() {
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [clientError, setClientError] = useState<string | null>(null);
  const router = useRouter();
  const params = useSearchParams();
  const supabase = createClient();

  const message =
    clientError ??
    describeError(
      params.get("error"),
      params.get("error_description") ?? params.get("detail"),
    );

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) router.push("/admin");
      else setChecking(false);
    });
  }, [router, supabase]);

  const signInWithGitHub = async () => {
    setLoading(true);
    setClientError(null);
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    });
    if (error) {
      console.error("Error signing in:", error);
      setClientError("Could not start GitHub sign-in. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="grid min-h-screen place-items-center bg-mist px-5 py-12">
      <div className="w-full max-w-md rounded-lg border border-line bg-white p-8 shadow-[0_16px_40px_-20px_rgb(15_23_42_/_0.25)] sm:p-10">
        <div className="flex flex-col items-center text-center">
          <Image
            src="/brand/tcoefs-logo.png"
            alt="TCoEFS crest"
            width={104}
            height={90}
            priority
            className="h-16 w-auto"
          />
          <h1 className="mt-5 text-[1.5rem] font-semibold text-ink">
            TCoEFS Admin
          </h1>
          <p className="mt-1.5 text-[0.9375rem] text-stone">
            Sign in to manage the website content.
          </p>
        </div>

        {message && (
          <div
            role="alert"
            className="mt-6 flex gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-[0.875rem] text-red-800"
          >
            <TriangleAlert className="mt-0.5 size-4 shrink-0" />
            <p>{message}</p>
          </div>
        )}

        {checking ? (
          <div className="mt-8 flex items-center justify-center gap-2 text-stone">
            <Loader2 className="size-4 animate-spin" /> Checking your session…
          </div>
        ) : (
          <button
            type="button"
            onClick={signInWithGitHub}
            disabled={loading}
            className="mt-8 flex h-12 w-full items-center justify-center gap-3 rounded-md bg-[#24292f] text-[0.9375rem] font-semibold text-white transition-colors duration-200 hover:bg-black disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="size-5 animate-spin" /> Redirecting to GitHub…
              </>
            ) : (
              <>
                <Github className="size-5" /> Sign in with GitHub
              </>
            )}
          </button>
        )}

        <p className="mt-6 text-center text-[0.8125rem] leading-relaxed text-stone">
          Access is limited to authorised administrators.
        </p>
        <p className="mt-5 text-center">
          <Link href="/" className="text-[0.875rem] font-semibold text-pine">
            Back to the website
          </Link>
        </p>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}
