import Link from "next/link";
import { ArrowRight, Bot, Building2, CalendarClock, Check, Mail, Search, Send, Sparkles, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  { icon: Search, title: "Lead discovery", description: "Ask for your school, location, event, audience, and funding target, then surface companies and contact paths worth pursuing." },
  { icon: UsersRound, title: "Contact matching", description: "Blend a sponsor directory with AI research to identify partnership, recruiting, community, and education-facing contacts." },
  { icon: Sparkles, title: "Personalized templates", description: "Generate sponsor-specific emails that mention your event, impact, ask amount, and why the company is a fit." },
  { icon: Building2, title: "Pipeline CRM", description: "Move leads through prospecting, contacted, meeting, negotiating, sponsored, and rejected without losing context." },
  { icon: CalendarClock, title: "Follow-up system", description: "Track stale conversations and draft the next message when a sponsor has not replied." },
  { icon: Send, title: "Email workflow", description: "Copy drafts, open mailto sends, and prepare for Gmail or Outlook integration when credentials are connected." }
];

const pricing = [
  { name: "Launch", price: "$0", description: "For one club or event getting its first sponsorship process online.", cta: "Start finding leads" },
  { name: "Team", price: "$19", description: "For student teams running active outreach with shared contacts and follow-ups.", cta: "Upgrade team" },
  { name: "Campus", price: "Custom", description: "For universities, chapters, and multi-program nonprofit ecosystems.", cta: "Talk to us" }
];

const proof = [
  {
    quote: "We went from a messy spreadsheet to a sponsor list, outreach drafts, and follow-up reminders in one afternoon.",
    person: "Anika Rao",
    role: "Hackathon director, Midwest university"
  },
  {
    quote: "The best part is that it tells us who to look for, not just what to write. That saved our organizer team hours.",
    person: "Marcus Lee",
    role: "Treasurer, student engineering club"
  },
  {
    quote: "SponsorFlow gives new organizers the context older board members usually take with them when they graduate.",
    person: "Elena Morris",
    role: "Nonprofit partnerships lead"
  }
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-transparent">
      <header className="sticky top-0 z-20 border-b bg-background/72 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm shadow-primary/30">
              <Bot className="size-4" />
            </span>
            SponsorFlow
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <Link href="/dashboard" className="hover:text-foreground">Live demo</Link>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" size="sm">
              <Link href="/dashboard">Live demo</Link>
            </Button>
            <Button asChild size="sm">
              <Link href="/discover">Find sponsors</Link>
            </Button>
          </div>
        </div>
      </header>

      <section className="soft-grid border-b">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-20 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:py-24">
          <div className="flex flex-col justify-center">
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border bg-card/85 px-3 py-1 text-sm text-muted-foreground shadow-sm">
              <Sparkles className="size-4" />
              AI sponsorship agent for student teams
            </div>
            <h1 className="max-w-3xl text-4xl font-semibold tracking-normal text-primary sm:text-5xl lg:text-6xl">
              Sponsorship outreach, from blank page to sent email.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              SponsorFlow asks what you are raising money for, finds relevant companies and contact paths, writes the right sponsorship email, and keeps the entire outreach pipeline organized.
            </p>
            <div className="mt-6 grid max-w-xl gap-2 text-sm text-muted-foreground sm:grid-cols-3">
              {["Lead discovery", "AI templates", "Sponsor CRM"].map((item) => (
                <div key={item} className="flex items-center gap-2 rounded-lg border bg-card/70 px-3 py-2">
                  <Check className="size-4 text-accent" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href="/discover">
                  Run sponsor discovery
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/dashboard">Open demo dashboard</Link>
              </Button>
            </div>
          </div>
          <div id="demo" className="maroon-glow rounded-2xl border bg-card/80 p-3 backdrop-blur">
            <div className="rounded-xl border bg-background/80 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Discovery run</p>
                  <p className="text-2xl font-semibold text-primary">24 qualified leads</p>
                </div>
                <Button asChild size="sm" variant="secondary">
                  <Link href="/ai">
                    <Mail />
                    Draft email
                  </Link>
                </Button>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {[
                  { label: "Context", value: "IU Spring Hackathon", detail: "$10,000 goal" },
                  { label: "Matched leads", value: "GitHub Education", detail: "education@github.com" },
                  { label: "Message", value: "Cold sponsor email", detail: "Ready to send" }
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border bg-secondary/55 p-3">
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="mt-2 text-sm font-semibold">{item.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{item.detail}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-xl border bg-card p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium">Generated outreach</p>
                    <p className="mt-1 text-xs text-muted-foreground">Personalized for sponsor fit, student impact, and funding ask.</p>
                  </div>
                  <Button asChild size="sm">
                    <a href="mailto:?subject=Spring%20Hackathon%20sponsorship&body=Hi%20GitHub%20Education%20team%2C%0A%0AI%20am%20reaching%20out%20from%20Campus%20Builders%20Club%20at%20Indiana%20University...">
                      <Send />
                      Send
                    </a>
                  </Button>
                </div>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">
                  Hi GitHub Education team, I am reaching out from Campus Builders Club at Indiana University...
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-normal">A sponsorship operating system for student teams.</h2>
          <p className="mt-3 text-muted-foreground">
            SponsorFlow handles the painful middle: who to contact, what to say, when to follow up, and how to keep the next organizer from starting over.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title}>
              <CardHeader>
                <div className="mb-3 flex size-10 items-center justify-center rounded-lg border bg-secondary">
                  <feature.icon className="size-5 text-muted-foreground" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y bg-secondary/35">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-16 sm:px-6 md:grid-cols-3">
          {proof.map((item) => (
            <Card key={item.person}>
              <CardContent className="p-5">
                <p className="text-sm leading-6">“{item.quote}”</p>
                <div className="mt-5 border-t pt-4">
                  <p className="text-sm font-medium">{item.person}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{item.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section id="pricing" className="mx-auto max-w-7xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-normal">Start with one campaign. Scale to a sponsorship program.</h2>
          <p className="mt-3 text-muted-foreground">Built for clubs that need traction now and teams that want a repeatable partnership engine later.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {pricing.map((tier) => (
            <Card key={tier.name}>
              <CardHeader>
                <CardTitle>{tier.name}</CardTitle>
                <p className="text-3xl font-semibold">{tier.price}</p>
                <CardDescription>{tier.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-5 space-y-2 text-sm text-muted-foreground">
                  {["Lead discovery", "Contact notes", "AI outreach drafts"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <Check className="size-4 text-accent" />
                      {item}
                    </div>
                  ))}
                </div>
                <Button asChild className="w-full" variant={tier.name === "Team" ? "default" : "outline"}>
                  <Link href={tier.name === "Campus" ? "/settings#integrations" : "/discover"}>{tier.cta}</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}
