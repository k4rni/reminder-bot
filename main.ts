import { weekly, monthly, halfYear, yearly } from "./prompts.ts";

async function sendMessage(title: string, items: string[]) {
  const WEBHOOK = Deno.env.get("DISCORD_WEBHOOK");
  if (!WEBHOOK) throw new Error("DISCORD_WEBHOOK env not set");

  const content = `${title}\n${items.map((i) => `• ${i}`).join("\n")}`;

  await fetch(WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
}

Deno.cron("weekly-reminder", "0 4 * * 1", async () => {
  await sendMessage("# Weekly Reminder", weekly);
});

Deno.cron("monthly-reminder", "0 3 2 * *", async () => {
  await sendMessage("# Monthly Reminder", monthly);
});

Deno.cron("half-year-reminder", "0 3 1 7 *", async () => {
  await sendMessage("# Half-Year Reminder", halfYear);
});

Deno.cron("yearly-reminder", "0 3 1 1 *", async () => {
  await sendMessage("# Yearly Reminder", yearly);
});

console.log("Reminder cron jobs initialized...");
Deno.serve(() => new Response("OK"));
