import { prompts } from "./prompts.ts";

const kv = await Deno.openKv();

const WEBHOOK = Deno.env.get("DISCORD_WEBHOOK");

async function sendMessage(title: string, list: string[]) {
  if (!WEBHOOK) throw new Error("Missing webhook");

  const message =
    `**${title} Reflection**\n\n` + list.map((p) => `• ${p}`).join("\n");

  await fetch(WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: message }),
  });
}

async function run() {
  const now = new Date();

  const week = getWeek(now);
  const month = now.getMonth() + 1;

  const lastWeek = (await kv.get(["lastWeekly"])).value;
  const lastMonth = (await kv.get(["lastMonthly"])).value;
  const lastHalf = (await kv.get(["lastHalf"])).value;
  const lastYear = (await kv.get(["lastYear"])).value;

  // Weekly
  if (lastWeek !== week) {
    await sendMessage("Weekly", prompts.weekly);
    await kv.set(["lastWeekly"], week);
  }

  // Monthly
  if (lastMonth !== month) {
    await sendMessage("Monthly", prompts.monthly);
    await kv.set(["lastMonthly"], month);
  }

  // Half year
  const half = month <= 6 ? 1 : 2;
  if (lastHalf !== half) {
    await sendMessage("Half-Year", prompts.halfYear);
    await kv.set(["lastHalf"], half);
  }

  // Yearly
  const year = now.getFullYear();
  if (lastYear !== year) {
    await sendMessage("Yearly", prompts.yearly);
    await kv.set(["lastYear"], year);
  }

  return new Response("ok");
}

function getWeek(date: Date) {
  const first = new Date(date.getFullYear(), 0, 1);
  const pastDays = (date.getTime() - first.getTime()) / 86400000;
  return Math.ceil((pastDays + first.getDay() + 1) / 7);
}

Deno.serve(run);
