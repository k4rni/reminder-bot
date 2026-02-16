import { sendReminder } from "./main.ts";

const now = new Date();

const day = now.getDate();
const month = now.getMonth();
const weekday = now.getDay();

// Sunday
if (weekday === 0) {
  await sendReminder("weekly");
}

// First day of month
if (day === 1) {
  await sendReminder("monthly");
}

// July 1st
if (day === 1 && (month === 0 || month === 6)) {
  await sendReminder("halfYear");
}

// January 1st
if (day === 1 && month === 0) {
  await sendReminder("yearly");
}
