import { sendReminder } from "./main.ts";

Deno.cron("daily-check", "0 18 * * *", async () => {
  console.log("Running reminder check");

  const now = new Date();
  const weekday = now.getDay();

  if (weekday === 0) {
    await sendReminder("weekly");
  }
});
