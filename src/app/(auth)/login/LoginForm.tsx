"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import { dashboardPathForRole, type UserRole } from "@/lib/roles";

type Profile = {
  role: UserRole | null;
};

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleLogin() {
    setErrorMessage("");
    setIsSubmitting(true);
    const supabase = createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session) {
      setErrorMessage(error?.message ?? "Login failed. Please try again.");
      setIsSubmitting(false);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle<Profile>();

    const destination = profile?.role
      ? dashboardPathForRole(profile.role)
      : "/onboarding/role";

    router.replace(destination);
    router.refresh();
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
      <h1 className="text-3xl font-bold">Login</h1>

      <p className="mt-2 text-sm text-gray-500">Welcome back to Livario.</p>

      <div className="mt-8 space-y-5">
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email
          </label>

          <input
            type="email"
            className="w-full rounded-2xl border border-gray-300 bg-white p-4 outline-none transition focus:border-black"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Enter email"
            autoComplete="email"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Password
          </label>

          <input
            type="password"
            className="w-full rounded-2xl border border-gray-300 bg-white p-4 outline-none transition focus:border-black"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            autoComplete="current-password"
          />
        </div>

        {errorMessage ? (
          <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-700">
            {errorMessage}
          </p>
        ) : null}

        <button
          onClick={handleLogin}
          disabled={isSubmitting}
          className="w-full rounded-2xl bg-black p-4 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
