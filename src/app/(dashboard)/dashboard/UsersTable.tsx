"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/src/lib/supabase/client";
import type { UserRole } from "@/src/lib/supabase/get-profile";

interface UserRow {
  id: string;
  full_name: string | null;
  role: UserRole;
  created_at: string;
}

const ROLE_OPTIONS: UserRole[] = ["user", "admin", "super_admin"];

const ROLE_BADGE_STYLES: Record<UserRole, string> = {
  super_admin: "bg-slate-900 text-white",
  admin: "bg-emerald-50 text-emerald-700",
  user: "bg-slate-100 text-slate-600",
};

export function UsersTable({
  initialUsers,
  currentUserId,
}: {
  initialUsers: UserRow[];
  currentUserId: string;
}) {
  const [users, setUsers] = useState<UserRow[]>(initialUsers);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const channel = supabase
      .channel("profiles-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "profiles" },
        (payload) => {
          if (payload.eventType === "UPDATE" || payload.eventType === "INSERT") {
            const updated = payload.new as UserRow;
            setUsers((prev) => {
              const exists = prev.some((u) => u.id === updated.id);
              return exists
                ? prev.map((u) => (u.id === updated.id ? updated : u))
                : [updated, ...prev];
            });
          }
          if (payload.eventType === "DELETE") {
            const deletedId = (payload.old as { id: string }).id;
            setUsers((prev) => prev.filter((u) => u.id !== deletedId));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  async function handleRoleChange(userId: string, newRole: UserRole) {
    setError(null);
    setSavingId(userId);

    const supabase = createClient();
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ role: newRole })
      .eq("id", userId);

    setSavingId(null);

    if (updateError) {
      setError(`Couldn't update role: ${updateError.message}`);
      return;
    }

    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-900/5">
      {error && (
        <p className="border-b border-red-100 bg-red-50 px-5 py-3 text-sm text-red-600">
          {error}
        </p>
      )}

      <table className="w-full text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50">
          <tr>
            <th className="px-5 py-3 font-semibold text-slate-600">Name</th>
            <th className="px-5 py-3 font-semibold text-slate-600">Role</th>
            <th className="px-5 py-3 font-semibold text-slate-600">
              Joined
            </th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {users.map((user) => {
            const isSelf = user.id === currentUserId;
            const isSaving = savingId === user.id;

            return (
              <tr key={user.id}>
                <td className="px-5 py-3 text-slate-900">
                  {user.full_name ?? "—"}
                  {isSelf && (
                    <span className="ml-2 text-xs text-slate-400">(you)</span>
                  )}
                </td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-block rounded-full px-2.5 py-1 text-xs font-medium capitalize ${ROLE_BADGE_STYLES[user.role]}`}
                  >
                    {user.role.replace("_", " ")}
                  </span>
                </td>
                <td className="px-5 py-3 text-slate-500">
                  {new Date(user.created_at).toLocaleDateString()}
                </td>
                <td className="px-5 py-3 text-right">
                  <select
                    value={user.role}
                    disabled={isSelf || isSaving}
                    onChange={(e) =>
                      handleRoleChange(user.id, e.target.value as UserRole)
                    }
                    className="rounded-md border border-slate-300 px-2 py-1.5 text-xs font-medium text-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {ROLE_OPTIONS.map((role) => (
                      <option key={role} value={role}>
                        {role.replace("_", " ")}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            );
          })}

          {users.length === 0 && (
            <tr>
              <td colSpan={4} className="px-5 py-8 text-center text-slate-400">
                No users yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}