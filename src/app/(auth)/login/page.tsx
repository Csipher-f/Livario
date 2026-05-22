import { redirectIfSignedIn } from "@/lib/auth";
import { LoginForm } from "./LoginForm";

export default async function LoginPage() {
  await redirectIfSignedIn();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <LoginForm />
    </main>
  );
}
