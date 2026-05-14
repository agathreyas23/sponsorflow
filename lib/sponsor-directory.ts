import type { SponsorDiscoveryInput, SponsorLead, SponsorRecommendation } from "@/types/discovery";

type DirectoryEntry = {
  companyName: string;
  category: string;
  contactName: string;
  title: string;
  email: string;
  sourceUrl: string;
  localOnly?: boolean;
  tags: string[];
  suggestedAsk: string;
};

const directory: DirectoryEntry[] = [
  {
    companyName: "GitHub Education",
    category: "Developer tools",
    contactName: "Education Partnerships Team",
    title: "Student developer programs",
    email: "education@github.com",
    sourceUrl: "https://education.github.com/",
    tags: ["hackathon", "developer", "student", "software"],
    suggestedAsk: "$3,000-$7,500 plus credits, judges, swag, or workshop support"
  },
  {
    companyName: "Notion for Education",
    category: "Productivity",
    contactName: "Education Team",
    title: "Student and education partnerships",
    email: "team@makenotion.com",
    sourceUrl: "https://www.notion.com/product/notion-for-education",
    tags: ["student", "club", "organizing", "productivity"],
    suggestedAsk: "$1,500-$4,000 plus templates, credits, or workshop support"
  },
  {
    companyName: "Canva for Education",
    category: "Design and marketing",
    contactName: "Education Partnerships Team",
    title: "Education and community partnerships",
    email: "education@canva.com",
    sourceUrl: "https://www.canva.com/education/",
    tags: ["design", "marketing", "nonprofit", "student"],
    suggestedAsk: "$1,000-$3,000 plus design credits or workshop support"
  },
  {
    companyName: "Major League Hacking",
    category: "Hackathon ecosystem",
    contactName: "Partnerships Team",
    title: "Hackathon partnerships",
    email: "partners@mlh.io",
    sourceUrl: "https://mlh.io/",
    tags: ["hackathon", "developer", "student"],
    suggestedAsk: "Event support, sponsor introductions, judging, or operational guidance"
  },
  {
    companyName: "Local Chamber of Commerce",
    category: "Local business network",
    contactName: "Community Partnerships Office",
    title: "Local business sponsorship contact",
    email: "info@chamberofcommerce.com",
    sourceUrl: "https://www.chamberofcommerce.com/",
    localOnly: true,
    tags: ["local", "business", "community", "nonprofit", "school"],
    suggestedAsk: "$500-$2,500 plus local business introductions"
  },
  {
    companyName: "Regional Startup Incubator",
    category: "Local startup ecosystem",
    contactName: "Program Director",
    title: "Startup program and community partnerships",
    email: "",
    sourceUrl: "https://www.google.com/search?q=local+startup+incubator+program+director+university+partnerships",
    localOnly: true,
    tags: ["startup", "entrepreneurship", "local", "founder"],
    suggestedAsk: "$500-$2,500 plus judges, mentors, or founder prizes"
  }
];

export function generateDirectoryRecommendations(input: SponsorDiscoveryInput): SponsorRecommendation[] {
  const haystack = [
    input.organizationName,
    input.eventName,
    input.audienceType,
    input.eventDescription,
    input.schoolName,
    input.schoolLevel,
    input.sponsorshipType,
    input.location
  ]
    .join(" ")
    .toLowerCase();

  return directory
    .map((entry) => {
      const score = entry.tags.reduce((total, tag) => total + (haystack.includes(tag) ? 1 : 0), 0) + (entry.localOnly ? 1 : 0);
      return { entry, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ entry, score }) => {
      const lead = buildLead(input, entry);
      return {
        companyName: localizeCompany(entry, input),
        category: entry.category,
        fitReason: `${entry.companyName} is a strong fit for ${input.eventName} because it connects to ${input.audienceType}. ${entry.localOnly ? `It also gives you a local angle around ${input.location} and ${input.schoolName}.` : ""}`,
        leads: [lead],
        sponsorshipAngle: buildAngle(input, entry),
        suggestedAsk: entry.suggestedAsk,
        priority: score >= 2 ? "High" : "Medium"
      };
    });
}

function localizeCompany(entry: DirectoryEntry, input: SponsorDiscoveryInput) {
  if (!entry.localOnly) return entry.companyName;
  return `${input.location} ${entry.companyName}`;
}

function buildLead(input: SponsorDiscoveryInput, entry: DirectoryEntry): SponsorLead {
  const company = localizeCompany(entry, input);
  return {
    name: entry.contactName,
    title: entry.title,
    company,
    email: entry.email || null,
    profileUrl: null,
    sourceUrl: entry.sourceUrl,
    sourceLabel: "SponsorFlow directory",
    whyRelevant: `${entry.title} is the right contact path for ${input.sponsorshipType.toLowerCase()} because they likely handle partnerships, student programs, or community support.`,
    confidence: entry.localOnly ? "Medium" : "High",
    emailSubject: `${input.eventName} partnership with ${input.organizationName}`,
    emailBody: buildEmail(input, company)
  };
}

function buildAngle(input: SponsorDiscoveryInput, entry: DirectoryEntry) {
  if (entry.localOnly) {
    return `Lead with local impact: students from ${input.schoolName} building projects, bringing visibility to ${input.location} partners, and creating a direct community connection.`;
  }

  return `Lead with mission alignment: ${input.eventName} reaches ${input.audienceType}, and the sponsorship can include workshops, judging, prizes, recruiting, or product credits.`;
}

function buildEmail(input: SponsorDiscoveryInput, company: string) {
  return `Hi ${company} team,

I am reaching out from ${input.organizationName} at ${input.schoolName}. We are organizing ${input.eventName}, which brings together ${input.audienceType}.

We are looking for ${input.sponsorshipType.toLowerCase()} support and are hoping to raise ${input.fundingGoal}. The event is focused on ${input.eventDescription}

I thought ${company} could be a strong fit because this partnership would connect you with students and builders in ${input.location}, while helping make the event more accessible and valuable.

Would you be open to a quick conversation about sponsorship options? I can send over our sponsorship packet and audience details.

Best,
${input.organizationName}`;
}
