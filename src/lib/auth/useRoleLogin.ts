"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/src/lib/supabase/client";
import type { UserRole } from "@/src/lib/supabase/get-profile";
import { useToast } from "@/src/components/ui/Toast";

export function useRoleLogin(allowedRole: UserRole, redirectTo: string) {
  const router = useRouter();
  const { showToast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const supabase = createClient();

    const { data, error: signInError } =
      await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setLoading(false);
      showToast(signInError.message, "error");
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
      showToast("This login page isn't for your account type.", "error");
      return;
    }

    setLoading(false);
    showToast("Signed in successfully.", "success");
    router.push(redirectTo);
    router.refresh();
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    handleSubmit,
  };
}