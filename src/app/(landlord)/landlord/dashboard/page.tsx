import {
  LandlordRevenueCard,
  StatCard,
} from "@/components/app-shell/DashboardCards";

export default function LandlordDashboard() {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#3157ff]">
            Landlord dashboard
          </p>
          <h1 className="mt-3 text-5xl font-black tracking-tight text-slate-950">
            Manage your portfolio
          </h1>
          <p className="mt-3 text-lg leading-8 text-slate-500">
            Track properties, tenants, applications, and payments from one place.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm">
            Applications
          </a>
          <a className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm">
            Complaints
          </a>
          <a className="rounded-2xl bg-[#3157ff] px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20">
            Add Property
          </a>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Properties" meta="3 managed listings" value="3" />
        <StatCard label="Occupancy Rate" meta="3 occupied, 0 vacant" tone="green" value="100%" />
        <StatCard label="Total Revenue" meta="Collected this cycle" value="₦2,995,000" />
        <StatCard label="Pending Payments" meta="₦0 outstanding" tone="amber" value="0" />
      </div>

      <LandlordRevenueCard />
    </section>
  );
}
