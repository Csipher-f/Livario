import { redirect } from "next/navigation";
import { getSignedInDestination } from "@/lib/auth";

export default async function HomePage() {
  redirect(await getSignedInDestination());
}
