import type { ComponentType } from "react";
import {
  BuildingIcon,
  CardIcon,
  DashboardIcon,
  DocumentIcon,
  HeartIcon,
  MessageIcon,
  PlusCircleIcon,
  SettingsIcon,
  ToolIcon,
  UsersIcon,
} from "./icons";

export type AppRole = "tenant" | "landlord";

export type ShellNavItem = {
  href: string;
  icon: ComponentType<{ className?: string }>;
  label: string;
};

export const tenantNavItems: ShellNavItem[] = [
  { href: "/tenant/dashboard", icon: DashboardIcon, label: "Dashboard" },
  { href: "/tenant/my-lease", icon: DocumentIcon, label: "My Lease" },
  { href: "/tenant/browse", icon: BuildingIcon, label: "Browse" },
  { href: "/tenant/favorites", icon: HeartIcon, label: "Favorites" },
  { href: "/tenant/payments", icon: CardIcon, label: "Payments" },
  { href: "/tenant/maintenance", icon: ToolIcon, label: "Maintenance" },
  { href: "/tenant/messages", icon: MessageIcon, label: "Messages" },
  { href: "/tenant/settings", icon: SettingsIcon, label: "Settings" },
];

export const landlordNavItems: ShellNavItem[] = [
  { href: "/landlord/dashboard", icon: DashboardIcon, label: "Dashboard" },
  { href: "/landlord/properties", icon: BuildingIcon, label: "Properties" },
  { href: "/landlord/add-listing", icon: PlusCircleIcon, label: "Add Listing" },
  { href: "/landlord/applications", icon: DocumentIcon, label: "Applications" },
  { href: "/landlord/tenants", icon: UsersIcon, label: "Tenants" },
  { href: "/landlord/payments", icon: CardIcon, label: "Payments" },
  { href: "/landlord/complaints", icon: ToolIcon, label: "Complaints" },
  { href: "/landlord/messages", icon: MessageIcon, label: "Messages" },
  { href: "/landlord/settings", icon: SettingsIcon, label: "Settings" },
];

export const mobileNavByRole: Record<AppRole, ShellNavItem[]> = {
  tenant: [
    tenantNavItems[0],
    tenantNavItems[2],
    tenantNavItems[4],
    tenantNavItems[6],
  ],
  landlord: [
    landlordNavItems[0],
    landlordNavItems[1],
    landlordNavItems[5],
    landlordNavItems[7],
  ],
};

export function navItemsForRole(role: AppRole) {
  return role === "tenant" ? tenantNavItems : landlordNavItems;
}
