# SponsorFlow Project Proof

SponsorFlow is a working AI-assisted product prototype for student organization sponsorship outreach.

## Public Demo

Live demo: https://sponsorflow-tau.vercel.app/

Personal portfolio route: https://sponsorflow-tau.vercel.app/aditi

## What The Product Does

SponsorFlow helps student organizations, hackathons, nonprofits, and university clubs manage sponsorship outreach.

The core workflow is:

1. A user describes their club, school, event, audience, location, and funding goal.
2. SponsorFlow suggests relevant sponsors and contact paths.
3. The app generates outreach drafts tailored to the sponsor and event.
4. The user can track sponsors in a CRM-style pipeline.
5. Follow-up reminders, contacts, notes, and activities keep the outreach process organized.

## Built Features

- Public landing page.
- Dashboard with sponsor metrics, funding secured, response rate, reminders, and recent activity.
- Sponsor CRM with Kanban stages:
  - Prospecting
  - Contacted
  - Meeting Scheduled
  - Negotiating
  - Sponsored
  - Rejected
- Sponsor discovery workflow for finding companies, contacts, local sponsor angles, suggested asks, and outreach templates.
- AI email generator for:
  - Cold sponsorship email
  - Follow-up email
  - LinkedIn networking message
  - Judge invitation email
- Contacts manager with search, add, edit, delete, tags, notes, and activity context.
- Supabase-ready authentication and database schema.
- OpenAI API route for structured outreach generation.
- Vercel production deployment.
- Demo-data mode so the product can be reviewed without private API keys.

## Technical Stack

- Next.js 15 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui-style primitives
- Supabase Auth and PostgreSQL
- OpenAI API
- Vercel

## Why This Exists

The product came from a real student organizer pain point: sponsorship outreach is slow because organizers have to manually find companies, identify the right contacts, choose the right ask, write emails, and track follow-ups across scattered documents.

SponsorFlow turns that into one workflow.

## How AI Was Used

This project was built with an AI coding agent as a pair programmer. The human direction included:

- Defining the user problem.
- Redirecting the product from a generic sponsor CRM into a lead-finding and outreach platform.
- Giving product feedback on the flow, copy, layout, and visual direction.
- Testing the public demo and identifying broken or confusing interactions.
- Steering the product toward a polished, public proof-of-work demo.

The final result is AI-assisted but product-directed by Aditi Athreyas.

## Verification

Recommended local checks:

```bash
npm run typecheck
npm run build
```
