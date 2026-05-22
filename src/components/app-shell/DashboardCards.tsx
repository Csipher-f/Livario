import { ArrowRightIcon } from "./icons";

type StatCardProps = {
  label: string;
  meta?: string;
  tone?: "blue" | "green" | "amber";
  value: string;
};

const toneClasses = {
  amber: "bg-amber-50 text-amber-600",
  blue: "bg-blue-50 text-[#3157ff]",
  green: "bg-emerald-50 text-emerald-600",
};

export function StatCard({ label, meta, tone = "blue", value }: StatCardProps) {
  return (
    <article className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
      <div
        className={[
          "mb-7 flex h-14 w-14 items-center justify-center rounded-2xl text-2xl font-black",
          toneClasses[tone],
        ].join(" ")}
      >
        {label.charAt(0)}
      </div>
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black tracking-tight text-slate-950">
        {value}
      </p>
      {meta ? <p className="mt-2 text-sm text-slate-500">{meta}</p> : null}
    </article>
  );
}

export function TenantOverviewCard() {
  return (
    <article className="overflow-hidden rounded-[2rem] bg-white shadow-[0_24px_60px_rgba(15,23,42,0.12)]">
      <div className="relative min-h-64 bg-[linear-gradient(rgba(8,17,38,0.15),rgba(8,17,38,0.7)),url('https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80')] bg-cover bg-center p-7 text-white">
        <span className="absolute right-5 top-5 rounded-full bg-emerald-500 px-4 py-2 text-sm font-black shadow-lg">
          Active Lease
        </span>
        <div className="absolute bottom-7 left-7 right-7">
          <p className="text-sm font-black uppercase tracking-[0.18em] text-white/80">
            Your Home
          </p>
          <h2 className="mt-2 text-3xl font-black">Maple Crest Condo</h2>
          <p className="mt-2 text-sm font-semibold text-white/80">
            123 Victoria Island, Lagos
          </p>
        </div>
      </div>

      <div className="grid gap-5 p-6 sm:grid-cols-3">
        <div>
          <p className="text-sm font-semibold text-slate-500">Monthly Rent</p>
          <p className="mt-1 text-2xl font-black">₦2,000,000</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-500">Landlord</p>
          <p className="mt-1 text-2xl font-black">Albert Nsemo</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-500">Lease Ends</p>
          <p className="mt-1 text-2xl font-black">May 14, 2027</p>
        </div>
      </div>

      <div className="px-6 pb-6">
        <div className="mb-3 flex items-center justify-between text-sm font-semibold text-slate-500">
          <span>Payment progress this month</span>
          <span className="text-slate-950">100%</span>
        </div>
        <div className="h-3 rounded-full bg-slate-100">
          <div className="h-3 rounded-full bg-[#3157ff]" style={{ width: "100%" }} />
        </div>
        <a className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#3157ff]">
          View Rental Overview
          <ArrowRightIcon className="h-4 w-4" />
        </a>
      </div>
    </article>
  );
}

export function LandlordRevenueCard() {
  return (
    <article className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-black tracking-tight">Revenue Overview</h2>
        <span className="rounded-full border border-slate-200 px-4 py-2 text-sm font-black text-slate-700">
          Last 6 months
        </span>
      </div>

      <div className="mt-8 flex h-56 items-end gap-4 border-b border-slate-200 px-2">
        {[52, 66, 58, 82, 74, 92].map((height, index) => (
          <div className="flex flex-1 flex-col items-center gap-3" key={height}>
            <div
              className={[
                "w-full rounded-t-2xl",
                index === 5 ? "bg-[#3157ff]" : "bg-slate-200",
              ].join(" ")}
              style={{ height: `${height}%` }}
            />
            <span className="text-xs font-semibold text-slate-400">
              {["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index]}
            </span>
          </div>
        ))}
      </div>
    </article>
  );
}
