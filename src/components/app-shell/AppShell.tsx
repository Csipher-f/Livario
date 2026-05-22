"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { BellIcon, MoonIcon, ShieldIcon } from "./icons";
import {
  type AppRole,
  type ShellNavItem,
  mobileNavByRole,
  navItemsForRole,
} from "./navigation";

type AppShellProps = {
  children: ReactNode;
  role: AppRole;
};

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function BrandMark() {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#3157ff] text-white shadow-lg shadow-blue-600/20">
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
      </svg>
    </div>
  );
}

function SidebarNavItem({
  item,
  pathname,
}: {
  item: ShellNavItem;
  pathname: string;
}) {
  const active = isActive(pathname, item.href);
  const Icon = item.icon;

  return (
    <Link
      className={[
        "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition",
        active
          ? "bg-[#3157ff] text-white shadow-lg shadow-blue-950/10"
          : "text-slate-400 hover:bg-white/[0.08] hover:text-white",
      ].join(" ")}
      href={item.href}
    >
      <Icon className="h-5 w-5" />
      <span>{item.label}</span>
    </Link>
  );
}

function BottomNavItem({
  item,
  pathname,
}: {
  item: ShellNavItem;
  pathname: string;
}) {
  const active = isActive(pathname, item.href);
  const Icon = item.icon;

  return (
    <Link
      className={[
        "flex min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2 text-[11px] font-semibold transition",
        active ? "bg-[#3157ff] text-white" : "text-slate-500",
      ].join(" ")}
      href={item.href}
    >
      <Icon className="h-5 w-5" />
      <span className="w-full truncate text-center">{item.label}</span>
    </Link>
  );
}

function Sidebar({ role, pathname }: { role: AppRole; pathname: string }) {
  const navItems = navItemsForRole(role);

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 flex-col bg-[#081126] text-white lg:flex">
      <div className="flex h-24 items-center gap-4 border-b border-white/10 px-7">
        <BrandMark />
        <div>
          <p className="text-xl font-black tracking-tight">Livario</p>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-400">
            {role} workspace
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 px-5 py-7">
        {navItems.map((item) => (
          <SidebarNavItem item={item} key={item.href} pathname={pathname} />
        ))}
      </nav>

      <div className="border-t border-white/10 p-5">
        <div className="rounded-3xl bg-white/[0.06] p-4">
          <div className="flex items-center gap-3 text-slate-300">
            <ShieldIcon className="h-5 w-5" />
            <span className="text-sm font-semibold">
              {role === "tenant" ? "Tenant Account" : "Landlord Account"}
            </span>
          </div>
          <button className="mt-4 w-full rounded-2xl border border-white/10 px-4 py-3 text-left text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white">
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}

function MobileHeader({ role }: { role: AppRole }) {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/95 backdrop-blur lg:hidden">
      <div className="flex h-20 items-center justify-between px-5">
        <div className="flex items-center gap-3">
          <BrandMark />
          <div>
            <p className="text-lg font-black tracking-tight">Livario</p>
            <p className="text-xs font-semibold capitalize text-slate-500">
              {role} dashboard
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle theme"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm"
          >
            <MoonIcon className="h-5 w-5" />
          </button>
          <button
            aria-label="Notifications"
            className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-600 shadow-sm"
          >
            <BellIcon className="h-5 w-5" />
          </button>
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#3157ff] text-sm font-black text-white shadow-lg shadow-blue-600/20">
            AN
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileBottomNavigation({
  role,
  pathname,
}: {
  role: AppRole;
  pathname: string;
}) {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white/95 px-3 pb-3 pt-2 shadow-[0_-16px_40px_rgba(15,23,42,0.08)] backdrop-blur lg:hidden">
      <div className="mx-auto flex max-w-md gap-2">
        {mobileNavByRole[role].map((item) => (
          <BottomNavItem item={item} key={item.href} pathname={pathname} />
        ))}
      </div>
    </nav>
  );
}

export function AppShell({ children, role }: AppShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f7f9fc] text-slate-950">
      <Sidebar pathname={pathname} role={role} />
      <MobileHeader role={role} />

      <div className="lg:pl-72">
        <main className="mx-auto min-h-screen w-full max-w-7xl px-5 pb-28 pt-6 sm:px-8 lg:px-10 lg:py-10">
          {children}
        </main>
      </div>

      <MobileBottomNavigation pathname={pathname} role={role} />
    </div>
  );
}
