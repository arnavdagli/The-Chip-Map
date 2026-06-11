# The Chip Map

> **Personal learning project — not maintained, not for commercial use.**

An interactive, AI-assisted timeline of semiconductor history and geopolitics — from the invention of the transistor in 1947 to today's export controls and CHIPS Act fabs.

Inspired by *Chip War* by Chris Miller. Run locally — there is no public deployment.

## Features

- **Horizontal scrolling timeline** — 30 curated events spanning 1947 to the present, alternating above and below the axis
- **Filters** — narrow events by category (Invention, Company, Policy, Trade War, Milestone) or country (US, Japan, Taiwan, South Korea, China, Netherlands, EU)
- **"What happened?"** — one click on any event streams an AI-generated summary, grounded in that event's curated entry
- **Per-event follow-up chat** — ask questions about a specific event and get answers scoped to its context
- **"Ask the timeline"** — a site-wide Q&A bar that answers questions using the full curated timeline as context
- **Fact-checked data** — every event entry is verified against primary sources (Computer History Museum, IEEE, government records)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 16 (App Router) |
| UI | React 19, Tailwind CSS |
| AI | Groq API — Llama 3.3 70B, streamed responses |
| Data | Curated JSON, served statically |
| Hosting | Local dev (Vercel optional) |

## Architecture & Security

The AI endpoints are designed so the API key can't be hijacked as a general-purpose LLM proxy:

- **Server-side event lookup** — clients send only an event `id`; all prompt content is resolved from `data/events.json` on the server
- **Message sanitization** — only `user`/`assistant` roles pass through, with strict caps on message count and length
- **Per-IP rate limiting** — in-app limiter on every AI route (optional Vercel WAF rules if deployed)
- **Grounded prompts** — the model is instructed to answer only from the curated timeline and to say so when it can't

## Getting Started

```bash
npm install
cp .env.local.example .env.local
# Add your GROQ_API_KEY to .env.local (free key at console.groq.com)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  api/ask/       Site-wide timeline Q&A (streaming)
  api/chat/      Per-event follow-up chat (streaming)
  api/explain/   Per-event AI summary (streaming)
components/
  Timeline.js    Main layout, filtering, selection state
  TimelineNode.js  Event cards along the axis
  SidePanel.js   Event detail + AI summary + chat
  AskBar.js      Collapsible site-wide Q&A
  FilterBar.js   Category & country filters
data/
  events.json    Curated, fact-checked event entries
lib/
  groq.js        Groq streaming client
  apiGuards.js   Rate limiting + message sanitization
```

## Deploy (optional)

To run your own instance: import the repo on [Vercel](https://vercel.com), set `GROQ_API_KEY`, and enable **Bot Protection** plus a rate-limit rule on `/api/` in the Firewall tab.

## Disclaimer

This is a personal, educational project and is not affiliated with, endorsed by, or representative of any company, government, or organization mentioned. All content — including the curated timeline entries and especially the AI-generated summaries and answers (which are labeled as such in the UI) — is provided "as is" for educational purposes only, may contain errors or omissions, and should not be relied upon for research, financial, legal, or policy decisions. Verify all information independently against primary sources.
