import { redirectIfSignedIn } from "@/lib/auth";
import { RegisterForm } from "./RegisterForm";

export default async function RegisterPage() {
  await redirectIfSignedIn();

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-6">
      <RegisterForm />
    </main>
  );
}
