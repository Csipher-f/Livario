import { AppShell } from "@/components/app-shell/AppShell";
import { requireRole } from "@/lib/auth";

export default async function LandlordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("landlord");

  return <AppShell role="landlord">{children}</AppShell>;
}
