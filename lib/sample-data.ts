import type { Activity, Contact, Reminder, Sponsor } from "@/types/database";

export const demoSponsors: Sponsor[] = [
  {
    id: "s-1",
    organization_id: "demo-org",
    company_name: "Figma",
    contact_name: "Maya Chen",
    email: "maya@figma.com",
    linkedin_url: "https://linkedin.com/in/mayachen",
    notes: "Design tooling alignment is strong. Mention beginner workshops and portfolio reviews.",
    sponsorship_amount: 5000,
    last_contacted_at: "2026-05-06T14:00:00Z",
    status: "negotiating",
    tags: ["design", "tools", "tier-a"],
    position: 1,
    created_at: "2026-04-18T12:00:00Z",
    updated_at: "2026-05-06T14:00:00Z"
  },
  {
    id: "s-2",
    organization_id: "demo-org",
    company_name: "Mercury",
    contact_name: "Andre Patel",
    email: "andre@mercury.com",
    linkedin_url: "https://linkedin.com/in/andrepatel",
    notes: "Fintech track sponsor. Asked for audience demographics.",
    sponsorship_amount: 3000,
    last_contacted_at: "2026-05-01T16:30:00Z",
    status: "meeting_scheduled",
    tags: ["fintech", "meeting"],
    position: 1,
    created_at: "2026-04-20T12:00:00Z",
    updated_at: "2026-05-01T16:30:00Z"
  },
  {
    id: "s-3",
    organization_id: "demo-org",
    company_name: "Notion",
    contact_name: "Elena Brooks",
    email: "elena@notion.so",
    linkedin_url: "https://linkedin.com/in/elenabrooks",
    notes: "Great fit for student productivity and organizer workflows.",
    sponsorship_amount: 2500,
    last_contacted_at: "2026-05-03T09:10:00Z",
    status: "contacted",
    tags: ["productivity", "student"],
    position: 1,
    created_at: "2026-04-21T12:00:00Z",
    updated_at: "2026-05-03T09:10:00Z"
  },
  {
    id: "s-4",
    organization_id: "demo-org",
    company_name: "Ramp",
    contact_name: "Jordan Kim",
    email: "jordan@ramp.com",
    linkedin_url: null,
    notes: "Potential meal sponsor. Research university recruiting goals.",
    sponsorship_amount: 1500,
    last_contacted_at: null,
    status: "prospecting",
    tags: ["recruiting", "ops"],
    position: 1,
    created_at: "2026-04-22T12:00:00Z",
    updated_at: "2026-04-22T12:00:00Z"
  },
  {
    id: "s-5",
    organization_id: "demo-org",
    company_name: "Linear",
    contact_name: "Sam Rivera",
    email: "sam@linear.app",
    linkedin_url: "https://linkedin.com/in/samrivera",
    notes: "Committed to community package and judge participation.",
    sponsorship_amount: 7500,
    last_contacted_at: "2026-05-08T10:00:00Z",
    status: "sponsored",
    tags: ["confirmed", "judges"],
    position: 1,
    created_at: "2026-04-10T12:00:00Z",
    updated_at: "2026-05-08T10:00:00Z"
  }
];

export const demoContacts: Contact[] = [
  {
    id: "c-1",
    organization_id: "demo-org",
    sponsor_id: "s-1",
    name: "Maya Chen",
    email: "maya@figma.com",
    linkedin_url: "https://linkedin.com/in/mayachen",
    title: "University Programs Lead",
    company: "Figma",
    notes: "Prefers concise emails and clear student impact metrics.",
    created_at: "2026-04-18T12:00:00Z",
    updated_at: "2026-05-06T14:00:00Z"
  },
  {
    id: "c-2",
    organization_id: "demo-org",
    sponsor_id: "s-2",
    name: "Andre Patel",
    email: "andre@mercury.com",
    linkedin_url: "https://linkedin.com/in/andrepatel",
    title: "Community Partnerships",
    company: "Mercury",
    notes: "Asked about fintech builders and project prize categories.",
    created_at: "2026-04-20T12:00:00Z",
    updated_at: "2026-05-01T16:30:00Z"
  },
  {
    id: "c-3",
    organization_id: "demo-org",
    sponsor_id: null,
    name: "Priya Desai",
    email: "priya@alumni.iu.edu",
    linkedin_url: null,
    title: "Alumni Advisor",
    company: "University Alumni Network",
    notes: "Can introduce student leaders to local startups.",
    created_at: "2026-04-25T12:00:00Z",
    updated_at: "2026-04-25T12:00:00Z"
  }
];

export const demoActivities: Activity[] = [
  {
    id: "a-1",
    organization_id: "demo-org",
    sponsor_id: "s-5",
    contact_id: null,
    actor_id: "demo-user",
    type: "sponsor_won",
    summary: "Linear confirmed a $7,500 sponsorship package.",
    created_at: "2026-05-08T10:00:00Z"
  },
  {
    id: "a-2",
    organization_id: "demo-org",
    sponsor_id: "s-1",
    contact_id: "c-1",
    actor_id: "demo-user",
    type: "email_sent",
    summary: "Sent updated design track proposal to Maya Chen.",
    created_at: "2026-05-06T14:00:00Z"
  },
  {
    id: "a-3",
    organization_id: "demo-org",
    sponsor_id: "s-2",
    contact_id: "c-2",
    actor_id: "demo-user",
    type: "meeting_booked",
    summary: "Booked Mercury partnership call for Friday.",
    created_at: "2026-05-01T16:30:00Z"
  }
];

export const demoReminders: Reminder[] = [
  {
    id: "r-1",
    organization_id: "demo-org",
    sponsor_id: "s-3",
    contact_id: null,
    title: "Follow up with Notion after 10 days without response",
    due_at: "2026-05-13T09:00:00Z",
    completed_at: null,
    suggested_message_id: null,
    created_at: "2026-05-03T09:10:00Z"
  },
  {
    id: "r-2",
    organization_id: "demo-org",
    sponsor_id: "s-4",
    contact_id: null,
    title: "Research Ramp recruiting priorities",
    due_at: "2026-05-14T15:00:00Z",
    completed_at: null,
    suggested_message_id: null,
    created_at: "2026-05-10T12:00:00Z"
  }
];
