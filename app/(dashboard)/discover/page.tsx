import { SponsorFinder } from "@/components/discover/sponsor-finder";

export default function DiscoverPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-muted-foreground">Prospecting assistant</p>
        <h1 className="text-2xl font-semibold tracking-normal md:text-3xl">Find leads and write the message.</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Give SponsorFlow your event, school, location, and funding goal, then get sponsor leads, contact paths, and tailored outreach drafts.
        </p>
      </div>
      <SponsorFinder />
    </div>
  );
}
