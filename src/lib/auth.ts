import "server-only";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/server-supabase";
import { dashboardPathForRole, type UserRole } from "@/lib/roles";

type Profile = {
  role: UserRole | null;
};

function isRefreshTokenError(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  const authError = error as { code?: string; message?: string };

  return (
    authError.code === "refresh_token_already_used" ||
    authError.message?.toLowerCase().includes("invalid refresh token")
  );
}

function isAuthSessionMissingError(error: unknown) {
  if (!error || typeof error !== "object") {
    return false;
  }

  const authError = error as { message?: string; name?: string };

  return (
    authError.name === "AuthSessionMissingError" ||
    authError.message?.toLowerCase().includes("auth session missing")
  );
}

export async function getCurrentUserProfile() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    if (isRefreshTokenError(error) || isAuthSessionMissingError(error)) {
      return { user: null, profile: null };
    }

    throw error;
  }

  if (!user) {
    return { user: null, profile: null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle<Profile>();

  return { user, profile };
}

export async function getSignedInDestination() {
  const { user, profile } = await getCurrentUserProfile();

  if (!user) {
    return "/login";
  }

  if (!profile?.role) {
    return "/onboarding/role";
  }

  return dashboardPathForRole(profile.role);
}

export async function redirectIfSignedIn() {
  const { user, profile } = await getCurrentUserProfile();

  if (!user) {
    return;
  }

  if (!profile?.role) {
    redirect("/onboarding/role");
  }

  redirect(dashboardPathForRole(profile.role));
}

export async function requireRole(expectedRole: UserRole) {
  const destination = await getSignedInDestination();

  if (destination === "/login" || destination === "/onboarding/role") {
    redirect(destination);
  }

  if (destination !== dashboardPathForRole(expectedRole)) {
    redirect(destination);
  }
}
