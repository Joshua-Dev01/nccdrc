import { redirect } from "next/navigation";
import { getProfile } from "@/src/lib/supabase/get-profile";
import { createClient } from "@/src/lib/supabase/server";
import { UsersTable } from "../UsersTable";

export default async function UsersPage() {
  const profile = await getProfile();

  // Only super admins manage other users' roles.
  if (!profile || profile.role !== "super_admin") {
    redirect("/dashboard");
  }

  const supabase = await createClient();
  const { data: users } = await supabase
    .from("profiles")
    .select("id, full_name, role, created_at")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-slate-900">
        Users
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Manage roles for everyone with an account. Changes apply immediately.
      </p>

      <div className="mt-6">
        <UsersTable initialUsers={users ?? []} currentUserId={profile.id} />
      </div>
    </div>
  );
}