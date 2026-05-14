"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { Calendar, ExternalLink, Mail, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { sponsorStatusLabel } from "@/lib/sponsor-stages";
import type { Sponsor } from "@/types/database";

interface SponsorDetailDrawerProps {
  sponsor: Sponsor | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SponsorDetailDrawer({ sponsor, open, onOpenChange }: SponsorDetailDrawerProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm" />
        <Dialog.Content className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l bg-background shadow-xl">
          <div className="flex items-start justify-between border-b p-5">
            <div>
              <Dialog.Title className="text-lg font-semibold">{sponsor?.company_name ?? "Sponsor"}</Dialog.Title>
              <Dialog.Description className="mt-1 text-sm text-muted-foreground">
                {sponsor ? sponsorStatusLabel[sponsor.status] : "Pipeline details"}
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <Button variant="ghost" size="icon" aria-label="Close sponsor details">
                <X />
              </Button>
            </Dialog.Close>
          </div>
          {sponsor ? (
            <div className="flex-1 space-y-6 overflow-y-auto p-5">
              <div>
                <p className="text-sm text-muted-foreground">Primary contact</p>
                <p className="mt-1 font-medium">{sponsor.contact_name ?? "Unknown contact"}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {sponsor.email ? (
                    <Button asChild variant="outline" size="sm">
                      <a href={`mailto:${sponsor.email}`}>
                        <Mail />
                        Email
                      </a>
                    </Button>
                  ) : null}
                  {sponsor.linkedin_url ? (
                    <Button asChild variant="outline" size="sm">
                      <a href={sponsor.linkedin_url} target="_blank" rel="noreferrer">
                        <ExternalLink />
                        LinkedIn
                      </a>
                    </Button>
                  ) : null}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border bg-card p-3">
                  <p className="text-xs text-muted-foreground">Amount</p>
                  <p className="mt-1 font-semibold">{formatCurrency(Number(sponsor.sponsorship_amount))}</p>
                </div>
                <div className="rounded-lg border bg-card p-3">
                  <p className="text-xs text-muted-foreground">Last contacted</p>
                  <p className="mt-1 flex items-center gap-1 text-sm font-medium">
                    <Calendar className="size-3" />
                    {sponsor.last_contacted_at ? new Date(sponsor.last_contacted_at).toLocaleDateString() : "Never"}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Tags</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {sponsor.tags.map((tag) => (
                    <Badge key={tag}>{tag}</Badge>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Notes</p>
                <p className="mt-2 whitespace-pre-wrap rounded-lg border bg-card p-3 text-sm text-muted-foreground">
                  {sponsor.notes || "No notes yet."}
                </p>
              </div>
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
