import { redirect } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  Users,
  Landmark,
  Scale,
  FileText,
  CreditCard,
  History,
  Settings,
  Search,
  Bell,
  HelpCircle,
  LogOut,
} from "lucide-react";
import { getProfile } from "@/src/lib/supabase/get-profile";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["super_admin", "admin"] },
  { label: "Cases", href: "/dashboard/cases", icon: FileText, roles: ["super_admin", "admin"] },
  { label: "User Management", href: "/dashboard/users", icon: Users, roles: ["super_admin"] },
  { label: "Council Members", href: "/dashboard/council-members", icon: Landmark, roles: ["super_admin"] },
  { label: "Neutrals", href: "/dashboard/neutrals", icon: Scale, roles: ["super_admin"] },
  { label: "News & Events", href: "/dashboard/news", icon: FileText, roles: ["super_admin", "admin"] },
  { label: "Membership Applications", href: "/dashboard/membership-applications", icon: FileText, roles: ["super_admin"] },
  { label: "Table of Fees", href: "/dashboard/fees", icon: CreditCard, roles: ["super_admin"] },
  { label: "Activity Log", href: "/dashboard/activity-log", icon: History, roles: ["super_admin"] },
] as const;

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();

  if (!profile) {
    redirect("/admin-drc-staffs-20-20/login");
  }

  if (profile.role === "user") {
    redirect("/");
  }

  const visibleNav = NAV_ITEMS.filter((item) =>
    (item.roles as readonly string[]).includes(profile.role)
  );

  const initials = (profile.full_name ?? "A")
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="flex w-64 shrink-0 flex-col bg-[#0B0F2B]">
        <div className="px-6 py-6">
          <p className="font-display text-lg font-extrabold tracking-tight text-white">
            NCC-DRC
          </p>
          <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-widest text-emerald-400">
            Admin Portal
          </p>
        </div>

        <nav className="flex-1 space-y-1 px-3">
          {visibleNav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
              >
                <Icon size={18} strokeWidth={1.75} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {profile.role === "super_admin" && (
          <div className="px-3 pb-2">
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <Settings size={18} strokeWidth={1.75} />
              Site Settings
            </Link>
          </div>
        )}

        <div className="border-t border-white/10 p-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold text-white">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-white">
                {profile.full_name ?? "Admin"}
              </p>
              <p className="truncate text-xs capitalize text-slate-400">
                {profile.role.replace("_", " ")}
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main column */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
          <p className="font-display text-base font-bold text-slate-900">
            Administrative Console
          </p>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search..."
                className="w-64 rounded-md border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <button
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Notifications"
            >
              <Bell size={18} />
            </button>
            <button
              className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
              aria-label="Help"
            >
              <HelpCircle size={18} />
            </button>

            <div className="mx-1 h-6 w-px bg-slate-200" />

            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                {initials}
              </div>
              <div className="text-right leading-tight">
                <p className="text-sm font-semibold text-slate-900">
                  {profile.full_name ?? "Admin"}
                </p>
                <span
                  className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                    profile.role === "super_admin"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {profile.role.replace("_", " ")}
                </span>
              </div>
            </div>

            <form action="/api/auth/signout" method="post">
              <button
                type="submit"
                className="rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                aria-label="Sign out"
              >
                <LogOut size={18} />
              </button>
            </form>
          </div>
        </header>

        <main className="flex-1 bg-slate-50 p-8">{children}</main>
      </div>
    </div>
  );
}