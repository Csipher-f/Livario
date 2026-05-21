export default function LandlordLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-200">
      <nav className="border-b bg-white p-4">Landlord Navigation</nav>

      <main>{children}</main>
    </div>
  );
}
