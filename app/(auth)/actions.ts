"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

function hasSupabaseEnv() {
  return Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
}

export async function signIn(formData: FormData) {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");

  if (!hasSupabaseEnv()) {
    redirect("/dashboard?demo=1");
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/dashboard");
}

export async function signUp(formData: FormData) {
  const fullName = String(formData.get("fullName") ?? "");
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const organizationName = String(formData.get("organizationName") ?? "My Organization");

  if (!hasSupabaseEnv()) {
    redirect("/dashboard?demo=1");
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName
      }
    }
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  if (data.user) {
    await supabase.from("organizations").insert({
      owner_id: data.user.id,
      name: organizationName
    });
  }

  redirect("/dashboard");
}

export async function signOut() {
  if (!hasSupabaseEnv()) {
    redirect("/");
  }

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/");
}
