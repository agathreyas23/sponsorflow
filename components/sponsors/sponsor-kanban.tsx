"use client";

import { useMemo, useState } from "react";
import { DndContext, DragEndEvent, PointerSensor, useDroppable, useSensor, useSensors } from "@dnd-kit/core";
import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Calendar, GripVertical, Mail } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SponsorDetailDrawer } from "@/components/sponsors/sponsor-detail-drawer";
import { sponsorStages } from "@/lib/sponsor-stages";
import { cn, formatCurrency } from "@/lib/utils";
import type { Sponsor, SponsorStatus } from "@/types/database";

interface SponsorKanbanProps {
  sponsors: Sponsor[];
  compact?: boolean;
}

export function SponsorKanban({ sponsors, compact = false }: SponsorKanbanProps) {
  const [items, setItems] = useState(sponsors);
  const [selected, setSelected] = useState<Sponsor | null>(null);
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const grouped = useMemo(() => {
    return sponsorStages.reduce<Record<SponsorStatus, Sponsor[]>>((acc, stage) => {
      acc[stage.id] = items
        .filter((sponsor) => sponsor.status === stage.id)
        .sort((a, b) => a.position - b.position);
      return acc;
    }, {} as Record<SponsorStatus, Sponsor[]>);
  }, [items]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const sponsorId = String(active.id);
    const targetStatus = String(over.id).startsWith("stage:")
      ? String(over.id).replace("stage:", "")
      : items.find((item) => item.id === String(over.id))?.status;

    if (!targetStatus) return;

    setItems((current) =>
      current.map((sponsor) =>
        sponsor.id === sponsorId ? { ...sponsor, status: targetStatus as SponsorStatus, updated_at: new Date().toISOString() } : sponsor
      )
    );

    void fetch(`/api/sponsors/${sponsorId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: targetStatus })
    });
  }

  return (
    <>
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
        <div className={cn("grid gap-4 overflow-x-auto pb-2", compact ? "xl:grid-cols-3 2xl:grid-cols-6" : "lg:grid-cols-3 2xl:grid-cols-6")}>
          {sponsorStages.map((stage) => (
            <KanbanColumn key={stage.id} id={stage.id} title={stage.title} description={stage.description} sponsors={grouped[stage.id]} onSelect={setSelected} />
          ))}
        </div>
      </DndContext>
      <SponsorDetailDrawer sponsor={selected} open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)} />
    </>
  );
}

function KanbanColumn({
  id,
  title,
  description,
  sponsors,
  onSelect
}: {
  id: SponsorStatus;
  title: string;
  description: string;
  sponsors: Sponsor[];
  onSelect: (sponsor: Sponsor) => void;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: `stage:${id}` });

  return (
    <section ref={setNodeRef} className={cn("min-w-72 rounded-xl border bg-secondary/45 p-3", isOver && "ring-2 ring-ring")}>
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">{title}</h3>
            <Badge>{sponsors.length}</Badge>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      <SortableContext items={sponsors.map((sponsor) => sponsor.id)} strategy={verticalListSortingStrategy}>
        <div className="space-y-3">
          {sponsors.map((sponsor) => (
            <SponsorCard key={sponsor.id} sponsor={sponsor} onSelect={onSelect} />
          ))}
          {sponsors.length === 0 ? (
            <div className="rounded-lg border border-dashed bg-background/70 p-4 text-center text-xs text-muted-foreground">
              Drop sponsors here
            </div>
          ) : null}
        </div>
      </SortableContext>
    </section>
  );
}

function SponsorCard({ sponsor, onSelect }: { sponsor: Sponsor; onSelect: (sponsor: Sponsor) => void }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: sponsor.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn("cursor-pointer p-4 transition hover:shadow-md", isDragging && "opacity-60 ring-2 ring-ring")}
      onClick={() => onSelect(sponsor)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h4 className="truncate text-sm font-semibold">{sponsor.company_name}</h4>
          <p className="mt-1 truncate text-xs text-muted-foreground">{sponsor.contact_name ?? sponsor.email ?? "No contact added"}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="size-7"
          aria-label={`Drag ${sponsor.company_name}`}
          {...attributes}
          {...listeners}
          onClick={(event) => event.stopPropagation()}
        >
          <GripVertical className="size-4" />
        </Button>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs">
        <span className="font-medium">{formatCurrency(Number(sponsor.sponsorship_amount))}</span>
        <span className="flex items-center gap-1 text-muted-foreground">
          <Calendar className="size-3" />
          {sponsor.last_contacted_at ? new Date(sponsor.last_contacted_at).toLocaleDateString() : "New"}
        </span>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {sponsor.tags.slice(0, 3).map((tag) => (
          <Badge key={tag}>{tag}</Badge>
        ))}
      </div>
      {sponsor.email ? (
        <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
          <Mail className="size-3" />
          <span className="truncate">{sponsor.email}</span>
        </div>
      ) : null}
    </Card>
  );
}
