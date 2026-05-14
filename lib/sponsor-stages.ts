import type { SponsorStatus } from "@/types/database";

export const sponsorStages: Array<{ id: SponsorStatus; title: string; description: string }> = [
  { id: "prospecting", title: "Prospecting", description: "New organizations worth researching" },
  { id: "contacted", title: "Contacted", description: "Initial outreach sent" },
  { id: "meeting_scheduled", title: "Meeting Scheduled", description: "Discovery or pitch call booked" },
  { id: "negotiating", title: "Negotiating", description: "Package and terms in progress" },
  { id: "sponsored", title: "Sponsored", description: "Committed or paid sponsor" },
  { id: "rejected", title: "Rejected", description: "Closed for now" }
];

export const sponsorStatusLabel = Object.fromEntries(
  sponsorStages.map((stage) => [stage.id, stage.title])
) as Record<SponsorStatus, string>;
