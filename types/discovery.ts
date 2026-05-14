export interface SponsorDiscoveryInput {
  organizationName: string;
  eventName: string;
  audienceType: string;
  eventDescription: string;
  fundingGoal: string;
  location: string;
  schoolName: string;
  schoolLevel: string;
  sponsorshipType: string;
}

export interface SponsorLead {
  name: string;
  title: string;
  company: string;
  email?: string | null;
  profileUrl: string | null;
  sourceUrl: string | null;
  sourceLabel: string;
  whyRelevant: string;
  confidence: "High" | "Medium" | "Low";
  emailSubject?: string;
  emailBody?: string;
}

export interface SponsorRecommendation {
  companyName: string;
  category: string;
  fitReason: string;
  leads: SponsorLead[];
  sponsorshipAngle: string;
  suggestedAsk: string;
  priority: "High" | "Medium" | "Low";
}
