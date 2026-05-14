# Coding Agent Session: SponsorFlow

## What I Built

I used a coding agent to help build and ship SponsorFlow, a full-stack AI-powered sponsorship outreach platform for student organizations, hackathons, nonprofits, and university clubs.

The original problem came from my own experience: sponsorship outreach is painfully manual. Organizers have to identify companies, find the right contact, decide whether the ask should be a sponsorship, partnership, judge invite, or follow-up, and then write a message that does not sound generic. SponsorFlow turns that into a workflow: describe the event, school, location, audience, and funding goal, then get matched sponsor leads, contact paths, suggested asks, and ready-to-send outreach drafts.

## Scope

The app includes:

- A public landing page for SponsorFlow.
- A protected-style SaaS dashboard with sponsor metrics, recent activity, reminders, and pipeline snapshot.
- A sponsor CRM with a Kanban pipeline across Prospecting, Contacted, Meeting Scheduled, Negotiating, Sponsored, and Rejected.
- An AI sponsor discovery workflow that asks for event/club context and returns suggested companies, contacts, local sponsor angles, outreach strategy, and generated email templates.
- An AI email generator for cold sponsorship emails, follow-ups, LinkedIn networking messages, and judge invitations.
- Contacts management with add/edit/delete, filtering, notes, tags, and activity context.
- Settings and integrations surfaces for Supabase, OpenAI, Gmail, and Outlook.
- Supabase PostgreSQL schema with RLS policies for users, organizations, sponsors, contacts, outreach messages, activities, and reminders.
- Vercel deployment support and a public demo mode so the product is accessible before real production keys are connected.

## Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style components
- Supabase Auth and PostgreSQL
- OpenAI API route for structured outreach generation
- Vercel production deployment

## How The Agent Helped

I treated the agent like a senior pair programmer. I described the product and the target user, then iterated quickly on product direction, UI quality, backend structure, and deployment issues.

The most useful part was that the agent did not just generate static UI. It helped turn a vague product need into a working product flow:

1. First, it scaffolded the Next.js app structure, dashboard routes, reusable components, Supabase clients, and schema.
2. Then it built the sponsor CRM, contact management, AI email generator, and sponsor discovery flow.
3. When I realized the real pain was not just tracking sponsors but finding who to contact, I redirected the product. The agent refactored the discovery page into an AI-like lead finder that asks for event, school, location, and funding goal, then returns companies, contacts, suggested asks, and email drafts.
4. I gave aesthetic feedback that the site looked too brown and too placeholder-like. The agent revised the palette toward maroon and light pink, rewrote demo copy to feel more real, and removed dead-feeling placeholder language.
5. I asked for a public YC-submit-ready link. The agent deployed the project to Vercel, debugged build/runtime issues, pinned the Node runtime to avoid a remote Webpack hashing crash, and verified the public URL.
6. Finally, it audited visible links and buttons so the demo did not feel broken when clicked.

## What I Learned

This session showed me how powerful coding agents are when used as an iterative product partner rather than a one-shot code generator. The best results came from me giving increasingly specific product feedback: "this should find the people for me," "make it feel real," "every click should go somewhere," and "make it publishable."

The agent accelerated the mechanical parts of implementation, but the product improved most when I clarified the user pain from my own experience. That combination let me get from idea to a deployed full-stack demo much faster than I could have alone.

## Public Demo

Live demo: https://sponsorflow-tau.vercel.app/

## Why I Am Proud Of This Session

I am proud of this session because it captures the kind of founder I am trying to become: I started with a real problem I personally felt, built a complete first version, listened to what felt fake or broken, and kept pushing until the product had a clear workflow and public URL. It is not just a UI mockup. It is a working prototype of a product that could help student organizers save hours of sponsorship research and outreach work.
