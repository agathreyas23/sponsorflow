# Deploy SponsorFlow

SponsorFlow is ready for Vercel deployment after dependencies are installed.

## Fastest YC Demo Deploy

1. Push this project to GitHub.
2. Import the repo in Vercel.
3. Use the default Next.js settings.
4. Deploy.

The app works as a public product demo without environment variables. In that mode:

- The landing page is public.
- The dashboard uses sample workspace data.
- Sponsor discovery uses the built-in starter sponsor directory.
- Signup/login route into the sample workspace instead of requiring Supabase.

## Production Integrations

Add these environment variables in Vercel when you want real accounts, database storage, and AI research:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
OPENAI_API_KEY=
```

Then run `supabase/schema.sql` in your Supabase SQL editor.

## Local Checks

```bash
npm install
npm run typecheck
npm run build
```
