# ReviewRadar — NFC Google Review Lead Finder

A mobile-first web app for selling NFC Google Review cards. Scan any area, get up to 50
real businesses with their review counts, ratings, categories and website status — then
copy one-tap Google review links straight into NFC Tools. No manual typing.

## Features

- **Near Me** — uses your phone GPS to find businesses around you
- **Any location** — type a mall, building, street or neighbourhood
- **50 leads per run** — name, category, rating, review count, Google Maps link
- **Website detector** — instantly see who has no website (your upsell list)
- **Review-count tiers** — filter 1–100, 100–500, 500–1k, 1k+ reviews
- **Instant review links** — generated via Google's official `writereview` endpoint
  (same output as productmate.com's generator, but automatic)
- **Copy all / Export CSV** — grab every link at once or export the day's route

## Tech

Next.js 14 (App Router) · TypeScript · Tailwind CSS · Google Places API · Deployed on Vercel.

The API key stays **server-side** (in a Route Handler) — it is never exposed to the browser.

## 1. Get a Google Places API key

1. Go to https://console.cloud.google.com and create a project
2. Enable the **Places API** (APIs & Services → Library)
3. Create an API key (APIs & Services → Credentials)
4. Optional but recommended: restrict the key to the Places API

One scan costs roughly 3 Text Search + ~60 Place Details calls — pennies per day of hunting.
Check current pricing at https://mapsplatform.google.com/pricing (new accounts get monthly credit).

## 2. Deploy to Vercel

1. Push this folder to a GitHub/GitLab repo
2. On https://vercel.com → **Add New Project** → import the repo
3. In **Environment Variables** add:
   ```
   GOOGLE_PLACES_API_KEY = <your key>
   ```
4. Click **Deploy**. Done — open the URL on your phone.

The route handler sets `maxDuration = 60` so the 50-lead scan completes comfortably.

## 3. Run locally

```bash
cp .env.example .env.local   # paste your key
npm install
npm run dev
```

Open http://localhost:3000 on your phone (same Wi-Fi) or use browser device emulation.

## How the review link works

For every business we generate:

```
https://search.google.com/local/writereview?placeid=<PLACE_ID>
```

Tapping it opens Google's own review form pre-filled for that business — this is exactly
what productmate.com generates. You copy it here and paste it into **NFC Tools** when
writing the tag.

## Troubleshooting

- **Timeout on Vercel**: upgrade plan, or lower `target` / `MAX_PAGES` in `lib/googlePlaces.ts`.
- **REQUEST_DENIED**: the Places API is not enabled, or the key is wrong.
- **No results**: broaden the keyword or area; some remote areas have sparse data.
