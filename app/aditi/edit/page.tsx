import Link from "next/link";
import { getAditiContent } from "@/lib/aditi-content";
import AditiEditor from "./editor-client";

export const metadata = {
  title: "Edit Aditi Page",
  robots: {
    index: false,
    follow: false
  }
};

const pageFont = '"Helvetica Neue", Helvetica, Arial, sans-serif';

export const dynamic = "force-dynamic";

export default async function EditAditiPage() {
  const initialContent = await getAditiContent();

  return (
    <main
      className="min-h-screen bg-[#f5efe4] px-5 py-8 text-[#15120e] md:px-8"
      style={{ fontFamily: pageFont }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-3 border-b border-[#d7c9b4] pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase text-[#7f7365]">Local editor</p>
            <h1 className="mt-2 text-3xl font-semibold">Edit Aditi page wording</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#5f5142]">
              Change text here, save it, then refresh the public page. This edits the local content file.
            </p>
          </div>
          <Link href="/aditi" className="text-sm font-medium text-[#8f1d21]">
            View page
          </Link>
        </div>
        <AditiEditor initialContent={initialContent} />
      </div>
    </main>
  );
}
