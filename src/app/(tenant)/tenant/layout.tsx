import { AppShell } from "@/components/app-shell/AppShell";
import { requireRole } from "@/lib/auth";

export default async function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole("tenant");

  return <AppShell role="tenant">{children}</AppShell>;
}
