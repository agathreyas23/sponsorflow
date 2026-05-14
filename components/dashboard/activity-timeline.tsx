import { formatDistanceToNow } from "date-fns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Activity } from "@/types/database";

export function ActivityTimeline({ activities }: { activities: Activity[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent activity</CardTitle>
        <CardDescription>Latest outreach, meetings, and sponsor updates.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {activities.map((activity) => (
            <div key={activity.id} className="flex gap-3">
              <div className="mt-1 size-2 rounded-full bg-accent" />
              <div className="min-w-0 flex-1">
                <p className="text-sm">{activity.summary}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
          {activities.length === 0 ? <p className="text-sm text-muted-foreground">No activity yet.</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}
