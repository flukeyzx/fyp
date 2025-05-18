import Mailgun from "mailgun.js";
import { config } from "dotenv";
import formData from "form-data";

config({
  path: "./.env",
});

export const mailgun = new Mailgun(formData);
export const mg = mailgun.client({
  username: "api",
  key: process.env.MAILGUN_API_KEY,
});

export const mailOptions = (to, subject, html) => {
  return {
    from: `Abdul Ahad <noreply@abdulahad.tech>`,
    to,
    subject,
    html,
  };
};
