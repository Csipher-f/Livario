import { redirect } from "next/navigation";
import { getSignedInDestination } from "@/lib/auth";
import { RoleSelectionForm } from "./RoleSelectionForm";

export default async function RoleSelectionPage() {
  const destination = await getSignedInDestination();

  if (destination !== "/onboarding/role") {
    redirect(destination);
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <RoleSelectionForm />
    </main>
  );
}
