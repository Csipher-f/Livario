import {
  StatCard,
  TenantOverviewCard,
} from "@/components/app-shell/DashboardCards";

export default function TenantDashboard() {
  return (
    <section className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.18em] text-[#3157ff]">
            Tenant dashboard
          </p>
          <h1 className="mt-3 max-w-2xl text-5xl font-black tracking-tight text-slate-950">
            Good morning, Albert
          </h1>
          <p className="mt-3 text-lg leading-8 text-slate-500">
            Here is your rental overview for today.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <a className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-black text-slate-700 shadow-sm">
            Request
          </a>
          <a className="rounded-2xl bg-[#3157ff] px-5 py-3 text-sm font-black text-white shadow-lg shadow-blue-600/20">
            Message
          </a>
        </div>
      </div>

      <TenantOverviewCard />

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Paid" meta="12 receipts captured" tone="green" value="₦2,995,000" />
        <StatCard label="Pending" meta="0 payments due" tone="amber" value="₦0" />
        <StatCard label="Open Requests" meta="1 in progress" value="1" />
        <StatCard label="Unread Messages" meta="From landlord and support" value="3" />
      </div>
    </section>
  );
}
