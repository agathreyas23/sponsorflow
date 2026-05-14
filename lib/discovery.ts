import type { SponsorDiscoveryInput, SponsorRecommendation } from "@/types/discovery";
import { generateDirectoryRecommendations } from "@/lib/sponsor-directory";

const baseRecommendations: SponsorRecommendation[] = [
  {
    companyName: "Figma",
    category: "Design tools",
    fitReason: "Strong fit for design, product, portfolio, and beginner-friendly creative workshops.",
    leads: [
      {
        name: "Role-based lead",
        title: "University Programs Lead or Community Partnerships Manager",
        company: "Figma",
        profileUrl: null,
        sourceUrl: "https://www.google.com/search?q=Figma+university+programs+partnerships+LinkedIn",
        sourceLabel: "Suggested public search",
        whyRelevant: "Likely owns student community, education, or university-facing partnerships.",
        confidence: "Medium"
      }
    ],
    sponsorshipAngle: "Offer a design challenge, portfolio review, or product design prize for student builders.",
    suggestedAsk: "$2,500-$5,000 plus mentors or judges",
    priority: "High"
  },
  {
    companyName: "GitHub",
    category: "Developer tools",
    fitReason: "Natural alignment with hackathons, open-source education, and student developer communities.",
    leads: [
      {
        name: "Role-based lead",
        title: "Education Program Manager or Developer Relations",
        company: "GitHub",
        profileUrl: null,
        sourceUrl: "https://www.google.com/search?q=GitHub+Education+Program+Manager+LinkedIn",
        sourceLabel: "Suggested public search",
        whyRelevant: "Likely works with student developers, hackathons, or campus education programs.",
        confidence: "Medium"
      }
    ],
    sponsorshipAngle: "Position the event as a way to help students ship open-source projects and learn collaboration workflows.",
    suggestedAsk: "$3,000-$7,500 plus credits, swag, or workshop support",
    priority: "High"
  },
  {
    companyName: "Notion",
    category: "Productivity",
    fitReason: "Useful for student teams, organizers, nonprofits, and project management-heavy events.",
    leads: [
      {
        name: "Role-based lead",
        title: "Community Lead or Campus Program Manager",
        company: "Notion",
        profileUrl: null,
        sourceUrl: "https://www.google.com/search?q=Notion+campus+program+community+partnerships+LinkedIn",
        sourceLabel: "Suggested public search",
        whyRelevant: "Likely handles student community programs or education-facing growth.",
        confidence: "Medium"
      }
    ],
    sponsorshipAngle: "Pitch Notion as the planning and documentation hub for teams before, during, and after the event.",
    suggestedAsk: "$1,500-$4,000 plus templates or student workspace credits",
    priority: "High"
  },
  {
    companyName: "Mercury",
    category: "Fintech",
    fitReason: "Good fit for entrepreneurship, startup, fintech, and builder audiences.",
    leads: [
      {
        name: "Role-based lead",
        title: "Startup Partnerships or Community Manager",
        company: "Mercury",
        profileUrl: null,
        sourceUrl: "https://www.google.com/search?q=Mercury+startup+partnerships+community+manager+LinkedIn",
        sourceLabel: "Suggested public search",
        whyRelevant: "Likely cares about reaching student founders and early startup builders.",
        confidence: "Medium"
      }
    ],
    sponsorshipAngle: "Connect Mercury with student founders and early startup teams building practical projects.",
    suggestedAsk: "$2,500-$5,000 for a startup track or founder prize",
    priority: "Medium"
  },
  {
    companyName: "Canva",
    category: "Design and marketing",
    fitReason: "Helpful for clubs, nonprofits, pitch decks, event branding, and beginner creators.",
    leads: [
      {
        name: "Role-based lead",
        title: "Education Partnerships or Community Partnerships",
        company: "Canva",
        profileUrl: null,
        sourceUrl: "https://www.google.com/search?q=Canva+education+partnerships+community+LinkedIn",
        sourceLabel: "Suggested public search",
        whyRelevant: "Likely supports education, nonprofits, and creative student communities.",
        confidence: "Medium"
      }
    ],
    sponsorshipAngle: "Frame the partnership around helping students present ideas clearly and create polished project materials.",
    suggestedAsk: "$1,000-$3,000 plus credits or design workshop support",
    priority: "Medium"
  },
  {
    companyName: "Local startup incubators",
    category: "Local ecosystem",
    fitReason: "Regional incubators want visibility with ambitious students, founders, and technical talent.",
    leads: [
      {
        name: "Role-based lead",
        title: "Program Director or Startup Partnerships Lead",
        company: "Local startup incubators",
        profileUrl: null,
        sourceUrl: "https://www.google.com/search?q=Indiana+startup+incubator+program+director+university+partnerships",
        sourceLabel: "Suggested public search",
        whyRelevant: "Likely wants connections to students, founders, mentors, and regional startup talent.",
        confidence: "Medium"
      }
    ],
    sponsorshipAngle: "Offer a recruiting and community-building channel into student founders and project teams.",
    suggestedAsk: "$500-$2,500 plus mentors, judges, or venue support",
    priority: "High"
  }
];

export function generateSponsorRecommendations(input: SponsorDiscoveryInput): SponsorRecommendation[] {
  const directoryMatches = generateDirectoryRecommendations(input);
  const roleBasedMatches = generateRoleBasedRecommendations(input);
  const seen = new Set<string>();

  return [...directoryMatches, ...roleBasedMatches].filter((recommendation) => {
    if (seen.has(recommendation.companyName)) return false;
    seen.add(recommendation.companyName);
    return true;
  });
}

function generateRoleBasedRecommendations(input: SponsorDiscoveryInput): SponsorRecommendation[] {
  const lower = `${input.audienceType} ${input.eventDescription}`.toLowerCase();
  const boosted = baseRecommendations.map((recommendation) => {
    let priority = recommendation.priority;
    if (lower.includes("design") && recommendation.category.includes("Design")) priority = "High";
    if (lower.includes("hack") && recommendation.category.includes("Developer")) priority = "High";
    if (lower.includes("startup") && recommendation.category.includes("Fintech")) priority = "High";

    return {
      ...recommendation,
      priority,
      fitReason: `${recommendation.fitReason} For ${input.eventName || "your event"}, this can connect directly to ${input.audienceType || "your audience"}.`,
      leads: recommendation.leads.map((lead) => ({
        ...lead,
        sourceUrl:
          lead.sourceUrl ??
          `https://www.google.com/search?q=${encodeURIComponent(`${recommendation.companyName} ${input.location} university partnerships sponsorship`)}`,
        whyRelevant: `${lead.whyRelevant} Strong fit for ${input.eventName || input.organizationName}.`,
        emailSubject: `${input.eventName} sponsorship opportunity`,
        emailBody: `Hi ${recommendation.companyName} team,

I am reaching out from ${input.organizationName} at ${input.schoolName}. We are organizing ${input.eventName} for ${input.audienceType} and are looking for ${input.sponsorshipType.toLowerCase()} support.

Our goal is to raise ${input.fundingGoal}. ${recommendation.sponsorshipAngle}

Would you be open to a short conversation about ways ${recommendation.companyName} could support the event?

Best,
${input.organizationName}`
      }))
    };
  });

  return boosted.sort((a, b) => priorityWeight(b.priority) - priorityWeight(a.priority));
}

function priorityWeight(priority: SponsorRecommendation["priority"]) {
  return { High: 3, Medium: 2, Low: 1 }[priority];
}
