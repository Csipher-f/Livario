"use client";

import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function RoleSelectionPage() {
  const router = useRouter();

  async function selectRole(role: "tenant" | "landlord") {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    await supabase.from("profiles").update({ role }).eq("id", user.id);

    if (role === "tenant") {
      router.push("/tenant/dashboard");
    } else {
      router.push("/landlord/dashboard");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="text-3xl font-bold">
          Let’s know how you want to use Livario
        </h1>

        <p className="mt-3 text-gray-500">
          Choose the experience that fits you best.
        </p>

        <div className="mt-8 space-y-4">
          <button
            onClick={() => selectRole("tenant")}
            className="w-full rounded-2xl border p-5 text-left transition hover:border-black"
          >
            <h2 className="text-xl font-semibold">Continue as Tenant</h2>

            <p className="mt-1 text-sm text-gray-500">
              Browse homes, save properties, and manage rentals.
            </p>
          </button>

          <button
            onClick={() => selectRole("landlord")}
            className="w-full rounded-2xl border p-5 text-left transition hover:border-black"
          >
            <h2 className="text-xl font-semibold">Continue as Landlord</h2>

            <p className="mt-1 text-sm text-gray-500">
              Manage properties, tenants, and listings.
            </p>
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-gray-400">
          You can switch this later in settings.
        </p>
      </div>
    </main>
  );
}
