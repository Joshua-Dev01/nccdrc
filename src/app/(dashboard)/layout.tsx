import { redirect } from "next/navigation";
import Link from "next/link";
import { getProfile } from "@/src/lib/supabase/get-profile";

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard", roles: ["super_admin", "admin"] },
  { label: "Cases", href: "/dashboard/cases", roles: ["super_admin", "admin"] },
  { label: "Neutrals", href: "/dashboard/neutrals", roles: ["super_admin"] },
  { label: "News & Events", href: "/dashboard/news", roles: ["super_admin", "admin"] },
  { label: "Membership Applications", href: "/dashboard/membership-applications", roles: ["super_admin"] },
  { label: "Council Members", href: "/dashboard/council-members", roles: ["super_admin"] },
  { label: "Fees", href: "/dashboard/fees", roles: ["super_admin"] },
  { label: "Users", href: "/dashboard/users", roles: ["super_admin"] },
  { label: "Activity Log", href: "/dashboard/activity-log", roles: ["super_admin"] },
  { label: "Settings", href: "/dashboard/settings", roles: ["super_admin"] },
] as const;

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const profile = await getProfile();

  // Not logged in at all — staff dashboard, send to the admin login.
  if (!profile) {
    redirect("/admin/login");
  }

  // Regular website users never get access to the admin dashboard.
  if (profile.role === "user") {
    redirect("/");
  }

  const visibleNav = NAV_ITEMS.filter((item) =>
    (item.roles as readonly string[]).includes(profile.role)
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-64 shrink-0 border-r border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-5 py-5">
          <p className="font-display text-sm font-bold text-slate-900">
            NCC-DRC Admin
          </p>
          <p className="mt-0.5 text-xs text-slate-500">
            {profile.full_name ?? "Admin"} ·{" "}
            <span className="font-medium capitalize">
              {profile.role.replace("_", " ")}
            </span>
          </p>
        </div>

        <nav className="flex flex-col gap-1 p-3">
          {visibleNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}