import Link from "next/link";
import { ExternalLink, Mail, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Workspace settings</p>
        <h1 className="text-2xl font-semibold tracking-normal md:text-3xl">Settings</h1>
      </div>
      <Card id="integrations">
        <CardHeader>
          <CardTitle>Email integrations</CardTitle>
          <CardDescription>Connect sending once OAuth credentials are added in production.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="rounded-lg border bg-secondary/35 p-4">
            <Mail className="size-5 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium">Gmail</p>
            <p className="mt-1 text-sm text-muted-foreground">Ready for Google OAuth configuration.</p>
            <Button asChild className="mt-4" size="sm" variant="outline">
              <Link href="/ai">Draft with AI</Link>
            </Button>
          </div>
          <div className="rounded-lg border bg-secondary/35 p-4">
            <Send className="size-5 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium">Outlook</p>
            <p className="mt-1 text-sm text-muted-foreground">Ready for Microsoft OAuth configuration.</p>
            <Button asChild className="mt-4" size="sm" variant="outline">
              <Link href="/contacts">Review contacts</Link>
            </Button>
          </div>
          <div className="rounded-lg border bg-secondary/35 p-4">
            <Sparkles className="size-5 text-muted-foreground" />
            <p className="mt-3 text-sm font-medium">OpenAI research</p>
            <p className="mt-1 text-sm text-muted-foreground">Add `OPENAI_API_KEY` in Vercel for live web research.</p>
            <Button asChild className="mt-4" size="sm" variant="outline">
              <a href="https://vercel.com/dashboard" target="_blank" rel="noreferrer">
                <ExternalLink />
                Vercel env
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Deployment checklist</CardTitle>
          <CardDescription>Connect the production services before inviting a team.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-muted-foreground">
          <p>1. Add Supabase environment variables in Vercel.</p>
          <p>2. Run the schema in `supabase/schema.sql`.</p>
          <p>3. Add `OPENAI_API_KEY` for AI generation.</p>
          <p>4. Configure Supabase email redirects for `/auth/callback`.</p>
        </CardContent>
      </Card>
    </div>
  );
}
