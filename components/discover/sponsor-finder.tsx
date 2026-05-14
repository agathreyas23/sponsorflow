"use client";

import { useState } from "react";
import { Copy, ExternalLink, Loader2, Mail, Plus, Search, Send, Sparkles, Target, UserRoundCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { SponsorRecommendation } from "@/types/discovery";

const starterForm = {
  organizationName: "Campus Builders Club",
  eventName: "Spring Hackathon",
  audienceType: "student developers, designers, and beginner founders",
  eventDescription: "A weekend hackathon where students build software projects, attend workshops, meet mentors, and pitch demos to judges.",
  fundingGoal: "$10,000",
  location: "Indiana",
  schoolName: "Indiana University",
  schoolLevel: "College",
  sponsorshipType: "Sponsorship or partnership"
};

export function SponsorFinder() {
  const [form, setForm] = useState(starterForm);
  const [recommendations, setRecommendations] = useState<SponsorRecommendation[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function findSponsors(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const response = await fetch("/api/discover", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    setLoading(false);

    if (!response.ok) {
      setError("Could not generate sponsor recommendations. Try again with a little more event context.");
      return;
    }

    const data = (await response.json()) as { recommendations: SponsorRecommendation[] };
    setRecommendations(data.recommendations);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
      <Card className="h-fit">
        <CardHeader>
          <CardTitle>Find sponsor targets</CardTitle>
          <CardDescription>Answer a few questions and SponsorFlow finds contacts, companies, and ready-to-send templates.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={findSponsors}>
            <Field label="Organization name" value={form.organizationName} onChange={(value) => setForm((current) => ({ ...current, organizationName: value }))} />
            <Field label="School / college" value={form.schoolName} onChange={(value) => setForm((current) => ({ ...current, schoolName: value }))} />
            <Field label="School level" value={form.schoolLevel} onChange={(value) => setForm((current) => ({ ...current, schoolLevel: value }))} />
            <Field label="Event name" value={form.eventName} onChange={(value) => setForm((current) => ({ ...current, eventName: value }))} />
            <Field label="Audience type" value={form.audienceType} onChange={(value) => setForm((current) => ({ ...current, audienceType: value }))} />
            <Field label="Funding goal" value={form.fundingGoal} onChange={(value) => setForm((current) => ({ ...current, fundingGoal: value }))} />
            <Field label="Location" value={form.location} onChange={(value) => setForm((current) => ({ ...current, location: value }))} />
            <Field label="Sponsorship type" value={form.sponsorshipType} onChange={(value) => setForm((current) => ({ ...current, sponsorshipType: value }))} />
            <div className="space-y-2">
              <Label htmlFor="event-description">Event description</Label>
              <Textarea
                id="event-description"
                value={form.eventDescription}
                onChange={(event) => setForm((current) => ({ ...current, eventDescription: event.target.value }))}
                required
              />
            </div>
            {error ? <p className="text-sm text-destructive">{error}</p> : null}
            <Button className="w-full" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
              {loading ? "Researching leads and writing templates" : "Find leads + write emails"}
            </Button>
          </form>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button asChild variant="outline" size="sm">
              <a href="/settings#integrations">
                <Mail />
                Connect Gmail
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <a href="/settings#integrations">
                <Send />
                Connect Outlook
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>

      <section className="space-y-4">
        {recommendations.length === 0 ? (
          <Card className="flex min-h-[560px] items-center justify-center p-8 text-center">
            <div>
              <div className="mx-auto flex size-12 items-center justify-center rounded-full border bg-secondary">
                <Target className="size-5 text-muted-foreground" />
              </div>
              <h2 className="mt-4 text-lg font-semibold">AI-found sponsor leads will appear here</h2>
              <p className="mt-2 max-w-lg text-sm text-muted-foreground">
                SponsorFlow combines a starter sponsor directory with AI web research, then creates a matching email template for each lead.
              </p>
            </div>
          </Card>
        ) : (
          recommendations.map((recommendation) => (
            <Card key={recommendation.companyName}>
              <CardHeader className="space-y-3">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <CardTitle>{recommendation.companyName}</CardTitle>
                      <Badge>{recommendation.priority} priority</Badge>
                      <Badge>{recommendation.category}</Badge>
                    </div>
                    <CardDescription className="mt-2">{recommendation.fitReason}</CardDescription>
                  </div>
                  <Badge className="bg-accent/35 text-accent-foreground">{recommendation.leads.length} leads</Badge>
                </div>
              </CardHeader>
              <CardContent className="grid gap-4 xl:grid-cols-[1.4fr_0.6fr]">
                <div className="grid gap-3 md:grid-cols-2">
                  {recommendation.leads.map((lead) => (
                    <div key={`${recommendation.companyName}-${lead.name}-${lead.title}`} className="rounded-lg border bg-card p-4 shadow-sm">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <UserRoundCheck className="size-4 text-muted-foreground" />
                            <p className="font-medium">{lead.name}</p>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">{lead.title}</p>
                          <p className="mt-1 text-xs text-muted-foreground">{lead.email ?? lead.company}</p>
                        </div>
                        <Badge>{lead.confidence}</Badge>
                      </div>
                      <p className="mt-3 text-sm text-muted-foreground">{lead.whyRelevant}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {lead.profileUrl ? (
                          <Button asChild variant="outline" size="sm">
                            <a href={lead.profileUrl} target="_blank" rel="noreferrer">
                              <ExternalLink />
                              Profile
                            </a>
                          </Button>
                        ) : null}
                        {lead.sourceUrl ? (
                          <Button asChild variant="secondary" size="sm">
                            <a href={lead.sourceUrl} target="_blank" rel="noreferrer">
                              <Search />
                              Source
                            </a>
                          </Button>
                        ) : null}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            void fetch("/api/contacts", {
                              method: "POST",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({
                                name: lead.name,
                                company: lead.company,
                                title: lead.title,
                                linkedin_url: lead.profileUrl,
                                notes: `${lead.whyRelevant}${lead.sourceUrl ? `\n\nSource: ${lead.sourceUrl}` : ""}`
                              })
                            });
                          }}
                        >
                          <Plus />
                          Add
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigator.clipboard.writeText(`${lead.emailSubject ?? ""}\n\n${lead.emailBody ?? ""}`)}
                        >
                          <Copy />
                          Copy email
                        </Button>
                        <Button asChild variant="ghost" size="sm">
                          <a
                            href={`mailto:${lead.email ?? ""}?subject=${encodeURIComponent(lead.emailSubject ?? `${form.eventName} sponsorship`)}&body=${encodeURIComponent(lead.emailBody ?? "")}`}
                          >
                            <Mail />
                            Send
                          </a>
                        </Button>
                      </div>
                      {lead.emailBody ? (
                        <div className="mt-4 rounded-lg border bg-secondary/35 p-3">
                          <p className="text-xs font-medium text-muted-foreground">Generated template</p>
                          <p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-muted-foreground">{lead.emailBody}</p>
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className="rounded-lg border bg-secondary/35 p-4">
                  <p className="text-sm font-medium">Outreach angle</p>
                  <p className="mt-2 text-sm text-muted-foreground">{recommendation.sponsorshipAngle}</p>
                  <p className="mt-4 text-sm font-medium">Suggested ask</p>
                  <p className="mt-2 text-sm text-muted-foreground">{recommendation.suggestedAsk}</p>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </section>
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
