import Link from "next/link";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SponsorKanban } from "@/components/sponsors/sponsor-kanban";
import { getWorkspaceData } from "@/lib/data";

export default async function SponsorsPage() {
  const { sponsors } = await getWorkspaceData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Sponsor CRM</p>
          <h1 className="text-2xl font-semibold tracking-normal md:text-3xl">Pipeline</h1>
          <p className="mt-1 text-sm text-muted-foreground">Move opportunities from prospecting to sponsored with a clean shared workflow.</p>
        </div>
        <Button asChild>
          <Link href="/discover">
            <Plus />
            Add sponsor
          </Link>
        </Button>
      </div>
      <SponsorKanban sponsors={sponsors} />
    </div>
  );
}
