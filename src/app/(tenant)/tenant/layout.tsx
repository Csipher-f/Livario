export default function TenantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="border-b bg-white p-4">Tenant Navigation</nav>

      <main>{children}</main>
    </div>
  );
}
