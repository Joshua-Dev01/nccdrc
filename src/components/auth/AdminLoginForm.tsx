"use client";

import { Loader2Icon, ShieldCheck } from "lucide-react";
import { useRoleLogin } from "@/src/lib/auth/useRoleLogin";

export function AdminLoginForm() {
  const { email, setEmail, password, setPassword, loading, handleSubmit } =
    useRoleLogin("admin", "/dashboard");

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex flex-col items-center text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50">
            <ShieldCheck size={24} className="text-emerald-600" strokeWidth={2} />
          </div>
          <h1 className="mt-4 font-display text-xl font-bold text-slate-900">
            Admin Sign In
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            For NCC-DRC staff and content administrators.
          </p>
        </div>

        <div className="rounded-xl bg-white p-8 shadow-sm ring-1 ring-slate-900/5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-emerald-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-600 disabled:opacity-60"
            >
                              {loading ? <Loader2Icon className="animate-spin" size={16} /> : "Sign In"}
              
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-slate-400">
          Nigerian Chambers of Commerce and Industry Dispute Resolution Centre
        </p>
      </div>
    </div>
  );
}