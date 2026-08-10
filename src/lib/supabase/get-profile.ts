import { createClient } from "./server";

export type UserRole = "super_admin" | "admin" | "user";

export interface Profile {
  id: string;
  full_name: string | null;
  role: UserRole;
}

export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, role")
    .eq("id", user.id)
    .single();

  if (!profile) return null;

  return profile as Profile;
}