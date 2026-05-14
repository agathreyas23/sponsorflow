import { format } from "date-fns";
import { Wand2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Reminder } from "@/types/database";

export function RemindersPanel({ reminders }: { reminders: Reminder[] }) {
  return (
    <Card>
      <CardHeader className="flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle>Follow-up reminders</CardTitle>
          <CardDescription>Draft personalized nudges when a sponsor goes quiet.</CardDescription>
        </div>
        <Button asChild size="sm" variant="secondary">
          <Link href="/ai">
            <Wand2 />
            Draft
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {reminders.map((reminder) => (
            <div key={reminder.id} className="rounded-lg border bg-background p-3">
              <p className="text-sm font-medium">{reminder.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">Due {format(new Date(reminder.due_at), "MMM d, h:mm a")}</p>
            </div>
          ))}
          {reminders.length === 0 ? <p className="text-sm text-muted-foreground">No pending follow-ups.</p> : null}
        </div>
      </CardContent>
    </Card>
  );
}
