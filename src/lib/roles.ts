export type UserRole = "tenant" | "landlord";

export function dashboardPathForRole(role: UserRole) {
  return role === "tenant" ? "/tenant/dashboard" : "/landlord/dashboard";
}
