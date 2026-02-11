import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import MessagesClient from "@/components/MessagesClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Messages — Greybird",
  description: "Your conversations on Greybird",
};

export default async function MessagesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <MessagesClient currentUserId={user.id} />;
}
