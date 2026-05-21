import { redirect } from "next/navigation";
import { createClient } from "@/lib/server-supabase";

export default async function TenantDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "tenant") {
    redirect("/landlord/dashboard");
  }

  return (
    <main className="p-10">
      <h1 className="text-3xl font-bold">Tenant Dashboard</h1>
    </main>
  );
}
