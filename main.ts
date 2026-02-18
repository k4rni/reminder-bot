// Questions
export const QUESTIONS = {
  weekly: [
    "Mood Meter [ ☀️  ⛅  ☁️  🌧️  🌩️ ]",
    "Something you learned",
    "Moment you want to remember",
    "What gave you energy?",
    "What drained you?",
  ],

  monthly: [
    "Accomplishments (big or small)",
    "Core memories from this month",
    "Gratitude list",
    "Favorite song of the month",
    "Comfort media (show/movie/book/video)",
    "Best thing you ate or discovered",
    "What you want MORE of next month",
    "What you want LESS of next month",
  ],

  halfYear: [
    "Biggest win so far",
    "Something that has changed since the start of the year",
    "One highlight memory",
    "Something still in progress",
    "One focus for the next 6 months",
  ],

  yearly: [
    "Theme/title of your year",
    "What are you most proud of this year?",
    "Plot twist of the year",
    "What did this year teach you about yourself?",
    "Goals achieved or moved toward",
    "People, places, or habits that supported you",
    "Something you’re leaving behind",
    "Best decision you made",
  ],
};

// Discord Post Function
const TOKEN = Deno.env.get("DISCORD_TOKEN")!;
const CHANNEL_ID = Deno.env.get("CHANNEL_ID")!;

async function sendMessage(title: string, questions: string[]) {
  const content =
    `## ${title}\n\n` + questions.map((q, i) => `${i + 1}. ${q}`).join("\n");

  await fetch(`https://discord.com/api/v10/channels/${CHANNEL_ID}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bot ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content }),
  });
}

// Set Time
const TARGET_UTC_HOUR = 5;

function isTargetHour(date: Date) {
  return date.getUTCHours() === TARGET_UTC_HOUR;
}

async function runScheduler() {
  const now = new Date();

  if (!isTargetHour(now)) {
    console.log("Not scheduled hour.");
    return;
  }

  const day = now.getUTCDate();
  const month = now.getUTCMonth() + 1;
  const weekday = now.getUTCDay();

  console.log("Checking reminders:", now.toISOString());

  // YEARLY — Dec 31
  if (month === 12 && day === 31) {
    await sendMessage("✨ YEARLY REFLECTION ✨", QUESTIONS.yearly);
    return;
  }

  // HALF YEAR — June 30
  if (month === 6 && day === 30) {
    await sendMessage("🌿 HALF YEAR CHECK-IN 🌿", QUESTIONS.halfYear);
    return;
  }

  // MONTHLY — 1st of month
  if (day === 1) {
    await sendMessage("📅 MONTHLY REFLECTION 📅", QUESTIONS.monthly);
    return;
  }

  // WEEKLY — Sunday
  if (weekday === 0) {
    await sendMessage("🗓️ WEEKLY CHECK-IN 🗓️", QUESTIONS.weekly);
    return;
  }

  console.log("No reminder today.");
}

Deno.cron("reminder-check", "0 * * * *", runScheduler);

Deno.serve(() => new Response("Reminder bot running"));
