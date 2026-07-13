"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, LogIn, AlertCircle } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError("Incorrect email or password. Please try again.");
        setLoading(false);
        return;
      }
      router.push("/admin");
      router.refresh();
    } catch {
      setError(
        "Unable to log in. Please check your connection and try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] dark:bg-gray-950 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 inline-flex rounded-2xl bg-white p-3 shadow-card">
            <Image
              src="/logos/op-institute-logo.png"
              alt="O.P. Institute of Studies"
              width={56}
              height={56}
              className="h-12 w-12 object-contain"
            />
          </div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Admin Panel
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            O.P. Institute · OP Kids Pre School
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-premium border border-gray-200/70 dark:border-white/10 p-6 sm:p-8 space-y-5"
        >
          {error && (
            <div className="flex items-start gap-2 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 px-4 py-3 text-sm">
              <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1.5">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="admin@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1.5">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-brand-500"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-600 text-white font-semibold hover:bg-brand-700 disabled:opacity-60 transition"
          >
            {loading ? "Logging in..." : "Login"}
            <LogIn className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-muted-foreground mt-6">
          For authorized staff only. Please contact the administrator for access.
        </p>
      </div>
    </div>
  );
}
