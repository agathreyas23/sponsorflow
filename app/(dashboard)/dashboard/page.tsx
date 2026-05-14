import { ActivityTimeline } from "@/components/dashboard/activity-timeline";
import { RemindersPanel } from "@/components/dashboard/reminders-panel";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { SponsorKanban } from "@/components/sponsors/sponsor-kanban";
import { getWorkspaceData } from "@/lib/data";

export default async function DashboardPage() {
  const { sponsors, activities, reminders } = await getWorkspaceData();

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Sponsorship command center</p>
          <h1 className="text-2xl font-semibold tracking-normal md:text-3xl">Good morning, let’s move the pipeline.</h1>
        </div>
      </div>
      <StatsCards sponsors={sponsors} reminders={reminders} />
      <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
        <ActivityTimeline activities={activities} />
        <RemindersPanel reminders={reminders} />
      </div>
      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Pipeline snapshot</h2>
          <p className="text-sm text-muted-foreground">Drag sponsors between stages as conversations progress.</p>
        </div>
        <SponsorKanban sponsors={sponsors} compact />
      </section>
    </div>
  );
}
