"use client";

import { useState } from "react";
import { Copy, Loader2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const initialForm = {
  companyName: "GitHub Education",
  organizationName: "Campus Builders Club",
  eventName: "Spring Hackathon",
  fundingGoal: "$10,000",
  eventDescription: "A weekend hackathon where students build software projects, attend workshops, meet mentors, and pitch demos to judges.",
  audienceType: "student developers, designers, and beginner founders",
  outreachType: "cold_email"
};

export function EmailGenerator() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState<{ subject: string; body: string; rationale: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const response = await fetch("/api/ai/generate-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setLoading(false);

    if (!response.ok) {
      setError("Could not generate outreach. Check the inputs and try again.");
      return;
    }

    setResult(await response.json());
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <Card className="h-fit p-5">
        <h2 className="text-base font-semibold">Generate outreach</h2>
        <form className="mt-4 space-y-4" onSubmit={generate}>
          <Field label="Company name" value={form.companyName} onChange={(value) => setForm((current) => ({ ...current, companyName: value }))} />
          <Field label="Organization name" value={form.organizationName} onChange={(value) => setForm((current) => ({ ...current, organizationName: value }))} />
          <Field label="Event name" value={form.eventName} onChange={(value) => setForm((current) => ({ ...current, eventName: value }))} />
          <Field label="Funding goal" value={form.fundingGoal} onChange={(value) => setForm((current) => ({ ...current, fundingGoal: value }))} />
          <Field label="Audience type" value={form.audienceType} onChange={(value) => setForm((current) => ({ ...current, audienceType: value }))} />
          <div className="space-y-2">
            <Label htmlFor="outreachType">Outreach type</Label>
            <select
              id="outreachType"
              className="h-10 w-full rounded-lg border bg-background px-3 text-sm shadow-sm"
              value={form.outreachType}
              onChange={(event) => setForm((current) => ({ ...current, outreachType: event.target.value }))}
            >
              <option value="cold_email">Sponsorship cold email</option>
              <option value="follow_up">Follow-up email</option>
              <option value="linkedin_message">LinkedIn networking message</option>
              <option value="judge_invitation">Judge invitation email</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="eventDescription">Event description</Label>
            <Textarea id="eventDescription" value={form.eventDescription} onChange={(event) => setForm((current) => ({ ...current, eventDescription: event.target.value }))} required />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button className="w-full" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : <Wand2 />}
            {loading ? "Generating" : "Generate draft"}
          </Button>
        </form>
      </Card>
      <Card className="min-h-[560px] p-5">
        {result ? (
          <div className="space-y-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Subject</p>
                <h2 className="mt-1 text-xl font-semibold">{result.subject}</h2>
              </div>
              <Button variant="outline" size="sm" onClick={() => navigator.clipboard.writeText(`${result.subject}\n\n${result.body}`)}>
                <Copy />
                Copy
              </Button>
            </div>
            <div className="whitespace-pre-wrap rounded-xl border bg-secondary/50 p-5 text-sm leading-6">{result.body}</div>
            <div className="rounded-lg border bg-card p-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">Strategy: </span>
              {result.rationale}
            </div>
          </div>
        ) : (
          <div className="flex h-full min-h-[520px] flex-col items-center justify-center text-center">
            <div className="rounded-full border bg-secondary p-3">
              <Wand2 className="size-5 text-muted-foreground" />
            </div>
            <h2 className="mt-4 text-lg font-semibold">Your AI draft will appear here</h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              Fill in the sponsor context and SponsorFlow will produce a structured outreach draft tuned for sponsorship conversion.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} value={value} onChange={(event) => onChange(event.target.value)} required />
    </div>
  );
}
