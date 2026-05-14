import { ArrowUpRight, CircleDollarSign, MailCheck, TimerReset, UsersRound } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import type { Reminder, Sponsor } from "@/types/database";

export function StatsCards({ sponsors, reminders }: { sponsors: Sponsor[]; reminders: Reminder[] }) {
  const contacted = sponsors.filter((sponsor) => sponsor.status !== "prospecting").length;
  const sponsored = sponsors.filter((sponsor) => sponsor.status === "sponsored");
  const responseRate = contacted ? Math.round((sponsors.filter((s) => ["meeting_scheduled", "negotiating", "sponsored"].includes(s.status)).length / contacted) * 100) : 0;
  const fundingSecured = sponsored.reduce((sum, sponsor) => sum + Number(sponsor.sponsorship_amount), 0);

  const stats = [
    { label: "Sponsors contacted", value: contacted.toString(), icon: UsersRound, detail: `${sponsors.length} total in CRM` },
    { label: "Response rate", value: `${responseRate}%`, icon: MailCheck, detail: "Meetings, negotiations, and wins" },
    { label: "Pending follow-ups", value: reminders.length.toString(), icon: TimerReset, detail: "Open reminders" },
    { label: "Funding secured", value: formatCurrency(fundingSecured), icon: CircleDollarSign, detail: `${sponsored.length} confirmed sponsors` }
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-2xl font-semibold tracking-normal">{stat.value}</p>
              </div>
              <div className="rounded-lg border bg-secondary p-2">
                <stat.icon className="size-4 text-muted-foreground" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs text-muted-foreground">
              <ArrowUpRight className="size-3" />
              {stat.detail}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
