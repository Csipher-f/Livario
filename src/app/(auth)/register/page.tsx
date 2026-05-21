"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const user = data.user;

    if (!user) return;

    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,
    });

    if (profileError) {
      alert(profileError.message);
      return;
    }

    router.push("/onboarding/role");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-sm border border-gray-100">
        <h1 className="text-3xl font-bold tracking-tight">
          Create your account
        </h1>

        <p className="mt-2 text-sm text-gray-500">Welcome to Livario.</p>

        <div className="mt-8 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 outline-none transition focus:border-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Password
            </label>

            <input
              type="password"
              placeholder="Enter your password"
              className="w-full rounded-2xl border border-gray-300 bg-white p-4 outline-none transition focus:border-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            onClick={handleRegister}
            className="mt-2 w-full rounded-2xl bg-black p-4 text-white transition hover:opacity-90"
          >
            Sign Up
          </button>
        </div>
      </div>
    </main>
  );
}
