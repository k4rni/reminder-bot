# Discord Update Reminder Webhook

A lightweight Deno cron job that sends periodic prompts to a Discord channel to keep my best friend Maya and I in sync with updates.

## Features

- **Weekly reminders** — Fires every Sunday at 9PM PST
- **Monthly reminders** — Fires on the 1st of every month at 8PM PST
- **Half-year reminders** — Fires on June 30th at 8PM PST
- **Yearly reminders** — Fires on December 31st at 8PM PST

## Prerequisites

- [Deno](https://deno.land/) installed
- A Discord webhook URL
- A [Deno Deploy](https://deno.com/deploy) account (for hosting)

## Setup

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd <your-repo>
```

### 2. Configure environment variables

| Variable          | Description                      |
| ----------------- | -------------------------------- |
| `DISCORD_WEBHOOK` | Your Discord channel webhook URL |

> [!WARNING]
> Only set `DISCORD_WEBHOOK` on your **production** Deno Deploy deployment, not on preview deployments. This prevents double-sending when both environments are active. I learned this the hard way.

### 3. Customize your prompts

Edit `prompts.ts` to update the questions or prompts sent for each cadence (weekly, monthly, half-year, yearly).

## Deployment

Deploy to [Deno Deploy](https://deno.com/deploy) and add your environment variables in the project dashboard under **Settings → Environment Variables**.

## Cron Schedule

| Job                  | Cron        | Description                                 |
| -------------------- | ----------- | ------------------------------------------- |
| `weekly-reminder`    | `0 5 * * 1` | Every Monday at 5AM UTC (Sunday 9PM PST)    |
| `monthly-reminder`   | `0 4 2 * *` | 2nd of every month at 4AM UTC (1st 8PM PST) |
| `half-year-reminder` | `0 4 1 7 *` | July 1st at 5AM UTC (June 30th 8PM PST)     |
| `yearly-reminder`    | `0 4 1 1 *` | Jan 1st at 5AM UTC (Dec 31st 8PM PST)       |

## Project Structure

```
├── deno.json       # Deno's project configuration file
├── main.ts         # Cron jobs and webhook sender
├── prompts.ts      # Weekly, monthly, half-year, and yearly prompt lists
└── README.md
```
