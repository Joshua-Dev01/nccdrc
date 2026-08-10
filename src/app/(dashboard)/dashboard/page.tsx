import { getProfile } from "@/src/lib/supabase/get-profile";

export default async function DashboardPage() {
  const profile = await getProfile();

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-900">
        Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        You&lsquo;re signed in as{" "}
        <span className="font-medium capitalize">
          {profile?.role.replace("_", " ")}
        </span>
        .
      </p>
    </div>
  );
}