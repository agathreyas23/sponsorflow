import { EmailGenerator } from "@/components/ai/email-generator";

export default function AiPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">AI email generator</p>
        <h1 className="text-2xl font-semibold tracking-normal md:text-3xl">Write outreach that sounds human.</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Generate cold emails, follow-ups, LinkedIn messages, and judge invitations with structured OpenAI outputs.
        </p>
      </div>
      <EmailGenerator />
    </div>
  );
}
