"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { dashboardPathForRole, type UserRole } from "@/lib/roles";
import { createClient } from "@/lib/supabase";

export function RoleSelectionForm() {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  async function selectRole(role: UserRole) {
    setErrorMessage("");
    setSelectedRole(role);
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.replace("/login");
      router.refresh();
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .upsert({ id: user.id, role }, { onConflict: "id" });

    if (error) {
      setErrorMessage(error.message);
      setSelectedRole(null);
      return;
    }

    router.replace(dashboardPathForRole(role));
    router.refresh();
  }

  return (
    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-3xl font-bold">
        Let&apos;s know how you want to use Livario
      </h1>

      <p className="mt-3 text-gray-500">
        Choose the experience that fits you best.
      </p>

      <div className="mt-8 space-y-4">
        <button
          onClick={() => selectRole("tenant")}
          disabled={selectedRole !== null}
          className="w-full rounded-2xl border p-5 text-left transition hover:border-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          <h2 className="text-xl font-semibold">Continue as Tenant</h2>

          <p className="mt-1 text-sm text-gray-500">
            Browse homes, save properties, and manage rentals.
          </p>
        </button>

        <button
          onClick={() => selectRole("landlord")}
          disabled={selectedRole !== null}
          className="w-full rounded-2xl border p-5 text-left transition hover:border-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          <h2 className="text-xl font-semibold">Continue as Landlord</h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage properties, tenants, and listings.
          </p>
        </button>
      </div>

      {errorMessage ? (
        <p className="mt-5 rounded-2xl bg-red-50 p-3 text-sm text-red-700">
          {errorMessage}
        </p>
      ) : null}

      <p className="mt-6 text-center text-sm text-gray-400">
        You can switch this later in settings.
      </p>
    </div>
  );
}
