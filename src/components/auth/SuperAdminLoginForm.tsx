"use client";

import { LoaderIcon, Lock } from "lucide-react";
import { useRoleLogin } from "@/src/lib/auth/useRoleLogin";

export function SuperAdminLoginForm() {
  const { email, setEmail, password, setPassword, error, loading, handleSubmit } =
    useRoleLogin("super_admin", "/dashboard");

  return (
    <div className="flex min-h-screen bg-slate-950">
      {/* Left panel — branding, hidden on small screens */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-slate-900 p-12 lg:flex">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-900 to-black" />
        <div className="relative">
          <p className="text-xs font-bold uppercase tracking-widest text-emerald-400">
            NCC-DRC
          </p>
        </div>
        <div className="relative">
          <Lock size={32} className="text-red-500" strokeWidth={1.5} />
          <h2 className="mt-6 max-w-sm font-display text-2xl font-bold leading-snug text-white">
            Super Admin Console
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate-400">
            Full system access — user management, site-wide settings, and
            oversight of every case, neutral, and record in the platform.
          </p>
        </div>
        <p className="relative text-xs text-slate-600">
          Restricted access. All activity is logged.
        </p>
      </div>

      {/* Right panel — form */}
      <div className="flex w-full flex-col items-center justify-center px-6 lg:w-1/2">
        <div className="w-full max-w-sm">
          <h1 className="font-display text-xl font-bold text-white">
            Super Admin Sign In
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Enter your credentials to continue.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-300"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white placeholder:text-slate-600 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            {error && (
              <p className="text-sm text-red-400" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-white px-4 py-2.5 cursor-pointer text-sm font-semibold text-slate-900 transition-colors hover:bg-slate-200 disabled:opacity-60"
            >
              <span className={loading ? "inline-flex items-center justify-center" : ""}>
                {loading ? <LoaderIcon className="animate-spin" size={16} /> : "Sign In"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}