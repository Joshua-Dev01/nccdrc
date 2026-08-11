"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";
import type { UserRole } from "@/src/lib/supabase/get-profile";

/**
 * Shared sign-in logic for role-locked login pages. Handles the actual
 * Supabase auth call, verifies the signed-in user's profile role matches
 * what this specific page allows, and signs them back out if it doesn't.
 */
export function useRoleLogin(allowedRole: UserRole, redirectTo: string) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();

    const { data, error: signInError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setLoading(false);
      setError(signInError.message);
      return;
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profileError || !profile || profile.role !== allowedRole) {
      await supabase.auth.signOut();
      setLoading(false);
      setError("This login page isn't for your account type.");
      return;
    }

    setLoading(false);
    router.push(redirectTo);
    router.refresh();
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  };
}