import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const contactUpdateSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().nullable().optional(),
  linkedin_url: z.string().url().nullable().optional(),
  title: z.string().nullable().optional(),
  company: z.string().nullable().optional(),
  notes: z.string().nullable().optional()
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const parsed = contactUpdateSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid contact update" }, { status: 400 });
  }

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({ ok: true, mode: "demo" });
  }

  const supabase = await createClient();
  const { data, error } = await supabase.from("contacts").update(parsed.data).eq("id", id).select("*").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({ ok: true, mode: "demo" });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("contacts").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ ok: true });
}
