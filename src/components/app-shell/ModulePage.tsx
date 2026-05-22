type ModulePageProps = {
  description: string;
  eyebrow: string;
  title: string;
};

export function ModulePage({ description, eyebrow, title }: ModulePageProps) {
  return (
    <section className="space-y-8">
      <div>
        <p className="text-sm font-black uppercase tracking-[0.18em] text-[#3157ff]">
          {eyebrow}
        </p>
        <h1 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
          {title}
        </h1>
        <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-500">
          {description}
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
          <h2 className="text-xl font-black">Module workspace</h2>
          <p className="mt-2 text-slate-500">
            This area is ready for tables, filters, realtime updates, and
            workflow-specific actions.
          </p>
          <div className="mt-7 grid gap-3">
            {["Overview", "Recent activity", "Priority actions"].map((item) => (
              <div
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-4"
                key={item}
              >
                <span className="font-semibold text-slate-700">{item}</span>
                <span className="h-2 w-2 rounded-full bg-[#3157ff]" />
              </div>
            ))}
          </div>
        </section>

        <aside className="rounded-[2rem] border border-slate-100 bg-white p-6 shadow-[0_18px_45px_rgba(15,23,42,0.07)]">
          <h2 className="text-xl font-black">Scalable panel</h2>
          <p className="mt-2 text-slate-500">
            Reserved for analytics, payment status, maintenance SLAs, or message
            presence.
          </p>
          <button className="mt-8 w-full rounded-2xl bg-[#3157ff] px-5 py-4 text-sm font-black text-white shadow-lg shadow-blue-600/20">
            Create Action
          </button>
        </aside>
      </div>
    </section>
  );
}
