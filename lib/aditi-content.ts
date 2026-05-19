import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { AditiContent } from "@/types/aditi-content";

const aditiContentPath = path.join(process.cwd(), "content", "aditi.json");

export async function getAditiContent() {
  const file = await readFile(aditiContentPath, "utf8");
  return JSON.parse(file) as AditiContent;
}

export async function saveAditiContent(content: AditiContent) {
  await writeFile(aditiContentPath, `${JSON.stringify(content, null, 2)}\n`, "utf8");
}
