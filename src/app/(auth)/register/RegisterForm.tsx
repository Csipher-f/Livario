"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

export function RegisterForm() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleRegister() {
    setMessage("");
    setIsSubmitting(true);
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      setIsSubmitting(false);
      return;
    }

    if (!data.user) {
      setMessage("We could not create that account. Try logging in if it already exists.");
      setIsSubmitting(false);
      return;
    }

    if (!data.session) {
      setMessage("Check your email to confirm your account, then log in.");
      setIsSubmitting(false);
      return;
    }

    router.replace("/onboarding/role");
    router.refresh();
  }

  return (
    <div className="w-full max-w-md rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
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
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
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
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="new-password"
          />
        </div>

        {message ? (
          <p className="rounded-2xl bg-red-50 p-3 text-sm text-red-700">
            {message}
          </p>
        ) : null}

        <button
          onClick={handleRegister}
          disabled={isSubmitting}
          className="mt-2 w-full rounded-2xl bg-black p-4 text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creating account..." : "Sign Up"}
        </button>
      </div>
    </div>
  );
}
