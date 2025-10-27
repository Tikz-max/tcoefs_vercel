"use client";

import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";

export default function UnauthorizedPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    // Sign out the user if they're still logged in
    const signOut = async () => {
      await supabase.auth.signOut();
    };
    signOut();
  }, [supabase]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
          <ShieldAlert className="w-10 h-10 text-red-600" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Access Denied
        </h1>

        <p className="text-gray-600 mb-6">
          You are not authorized to access the TCoEFS Admin Dashboard. This
          area is restricted to authorized administrators only.
        </p>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-800">
            If you believe you should have access, please contact the system
            administrator with your GitHub username.
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => router.push("/login")}
            className="w-full px-6 py-3 bg-[#2d5a2d] text-white font-semibold rounded-lg hover:bg-[#1e4a1e] transition-colors"
          >
            Try Again with Different Account
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
          >
            Return to Home
          </button>
        </div>
      </div>
    </div>
  );
}
