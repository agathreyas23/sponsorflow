import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const contactSchema = z.object({
  organization_id: z.string().optional(),
  name: z.string().min(1),
  email: z.string().email().nullable().optional(),
  linkedin_url: z.string().url().nullable().optional(),
  title: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  notes: z.string().nullable().optional()
});

export async function POST(request: Request) {
  const parsed = contactSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid contact" }, { status: 400 });
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({ ...parsed.data, id: crypto.randomUUID(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() });
  }

  const supabase = await createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const organizationId = parsed.data.organization_id ?? (await supabase.from("organizations").select("id").eq("owner_id", user.id).limit(1).single()).data?.id;
  if (!organizationId) {
    return NextResponse.json({ error: "No organization found" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("contacts")
    .insert({ ...parsed.data, organization_id: organizationId })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}
