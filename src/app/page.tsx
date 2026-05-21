import { supabase } from "@/lib/supabase";

export default async function HomePage() {
  const { data, error } = await supabase.from("profiles").select("*");

  console.log(data, error);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">Livario Connected</h1>
    </main>
  );
}
