import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const updateSponsorSchema = z.object({
  status: z.enum(["prospecting", "contacted", "meeting_scheduled", "negotiating", "sponsored", "rejected"]).optional(),
  position: z.number().int().optional()
});

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    return NextResponse.json({ ok: true, mode: "demo" });
  }

  const { id } = await params;
  const parsed = updateSponsorSchema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid sponsor update" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sponsors")
    .update(parsed.data)
    .eq("id", id)
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json(data);
}
