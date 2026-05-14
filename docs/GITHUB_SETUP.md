# GitHub Setup for Aditi

This is the simple version. You only need to do the account/login steps manually because they require your private email, password, and verification.

## 1. Create the Account

Go to https://github.com/signup and create an account.

Suggested usernames if available:

- `aditiathreyas`
- `aditi-athreyas`
- `aditi-a`

Use your real name and add your LinkedIn in the profile links.

## 2. Create the SponsorFlow Repository

After you are logged in:

1. Go to https://github.com/new
2. Repository name: `sponsorflow`
3. Description: `AI-assisted sponsorship outreach for student organizations`
4. Visibility: Public
5. Do not initialize with a README, `.gitignore`, or license because this local project already has those files
6. Click Create repository

## 3. Push This Local Project

After GitHub shows the new empty repo page, copy the commands it gives you. They will look like this:

```bash
git remote add origin https://github.com/YOUR_USERNAME/sponsorflow.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your actual GitHub username.

## 4. What to Pin on Your GitHub Profile

Pin the `sponsorflow` repo. It should show:

- Clear README
- Live Vercel demo
- Tech stack
- Screenshots or demo video
- Why the project matters

## 5. YC / Technical Reviewer Notes

Before submitting anywhere, make sure the repo has:

- No API keys
- A working production build
- A short product explanation
- Screenshots or a demo video
- A link to the live site
- A note that the app can run in demo mode without credentials
