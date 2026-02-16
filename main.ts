import { CONFIG } from "./config.ts";
import { QUESTIONS } from "./questions.ts";

async function sendReminder(type: keyof typeof QUESTIONS) {
  const questions = QUESTIONS[type];

  const content = `📋 **${type.toUpperCase()} CHECK-IN**

Hey! Time for our ${type} update.

${questions.map((q) => `• ${q}`).join("\n")}
`;

  await fetch(
    `https://discord.com/api/v10/channels/${CONFIG.CHANNEL_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bot ${CONFIG.BOT_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    },
  );
}

export { sendReminder };
