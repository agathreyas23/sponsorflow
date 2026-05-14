import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: string;
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center rounded-xl border border-dashed bg-card p-8 text-center">
      <div className="mb-4 rounded-full border bg-secondary p-3">
        <Icon className="size-5 text-muted-foreground" />
      </div>
      <h3 className="text-base font-semibold">{title}</h3>
      <p className="mt-1 max-w-sm text-sm text-muted-foreground">{description}</p>
      {action ? (
        <Button className="mt-5" size="sm">
          {action}
        </Button>
      ) : null}
    </div>
  );
}
