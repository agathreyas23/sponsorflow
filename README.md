# SponsorFlow

SponsorFlow helps student organizations find potential sponsors, organize sponsor pipelines, and draft outreach without starting from a blank page.

The project was built as a public demo for student organizers who need a practical way to move from "we need funding" to a researched sponsor list, contact plan, and first message.

## Live Demo

- Aditi portfolio route: https://sponsorflow-tau.vercel.app/aditi
- App route: https://sponsorflow-tau.vercel.app

## What It Does

- Finds sponsor recommendations from event details, audience, school, location, and funding goal
- Generates sponsorship outreach drafts for cold emails, follow-ups, LinkedIn messages, and judge invitations
- Tracks sponsors through a kanban-style pipeline
- Stores contacts and sponsor notes
- Runs in demo mode without API keys so the UI can be reviewed publicly
- Supports Supabase and OpenAI configuration for a full production setup

## Why I Built It

Student organizations often rely on scattered spreadsheets, old sponsor lists, and last-minute outreach. SponsorFlow is meant to make that work more organized: lead discovery, contact tracking, suggested asks, and outreach drafting in one workflow.

## Tech Stack

- Next.js 15 App Router
- React 19
- TypeScript
- Tailwind CSS v4
- Supabase Auth and PostgreSQL
- OpenAI Responses API
- Vercel deployment

## Local Setup

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in the values you want to use.

```bash
cp .env.example .env.local
```

Required for the full app:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `OPENAI_API_KEY`

Without these values, the app still runs in demo mode.

## Database

Run the SQL in [supabase/schema.sql](supabase/schema.sql) inside your Supabase project.

## Useful Commands

```bash
npm run dev
npm run build
npm run typecheck
```

Note: `npm run build` is the deployment check. If `.next/types` has stale generated references, run a fresh build before relying on `npm run typecheck`.

## Repository Status

This repo is prepared for a public GitHub profile. Before sharing widely, add:

- A public GitHub repo URL
- A short demo video or screenshots
- The final resume PDF link
- Any private API keys only in Vercel or `.env.local`, never committed
