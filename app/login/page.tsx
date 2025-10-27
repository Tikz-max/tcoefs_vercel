"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { Github } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // User is logged in, redirect to admin
        router.push("/admin");
      } else {
        setChecking(false);
      }
    };

    checkUser();
  }, [router, supabase]);

  const signInWithGitHub = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        console.error("Error signing in:", error);
        alert("Failed to sign in with GitHub. Please try again.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred. Please try again.");
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2d5a2d] to-[#1e4a1e] flex items-center justify-center">
        <div className="text-white text-xl">Checking authentication...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2d5a2d] to-[#1e4a1e] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2f3e2f] mb-2">
            TCoEFS Admin
          </h1>
          <p className="text-gray-600">Sign in to access the dashboard</p>
        </div>

        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#2d5a2d]/10 mb-4">
              <Github className="w-8 h-8 text-[#2d5a2d]" />
            </div>
            <p className="text-sm text-gray-600 mb-6">
              Only authorized administrators can access this dashboard
            </p>
          </div>

          <button
            onClick={signInWithGitHub}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 bg-[#24292e] hover:bg-[#1b1f23] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Signing in...
              </>
            ) : (
              <>
                <Github className="w-5 h-5" />
                Sign in with GitHub
              </>
            )}
          </button>

          <div className="text-center">
            <a
              href="/"
              className="text-sm text-[#2d5a2d] hover:text-[#1e4a1e] transition-colors"
            >
              Back to Home
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            Access is restricted to authorized personnel only. If you believe
            you should have access, contact the system administrator.
          </p>
        </div>
      </div>
    </div>
  );
}
