import { NextResponse } from "next/server";
import { getAditiContent, saveAditiContent } from "@/lib/aditi-content";
import type { AditiContent } from "@/types/aditi-content";

export async function GET() {
  return NextResponse.json(await getAditiContent());
}

export async function POST(request: Request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "The editor only saves in local development." }, { status: 403 });
  }

  const content = (await request.json()) as AditiContent;
  await saveAditiContent(content);
  return NextResponse.json({ ok: true });
}
