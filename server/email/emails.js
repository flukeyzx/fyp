import { mailOptions, mg } from "./mailgun.config.js";
import {
  welcomeEmailTemplate,
  verificationEmailTemplate,
  forgotPasswordEmailTemplate,
} from "./templates.js";
import { config } from "dotenv";

config({
  path: "./.env",
});

export const sendWelcomeEmail = async (email) => {
  try {
    const html = welcomeEmailTemplate;
    const options = mailOptions(email, "Welcome Mail", html);

    await mg.messages.create(process.env.MAILGUN_USER, options);
  } catch (error) {
    console.error(`Error in sendWelcomeEmail method ${error.message}.`);
  }
};

export const sendVerificationEmail = async (email, otp) => {
  try {
    const html = verificationEmailTemplate.replace("{otp}", otp);
    const options = mailOptions(email, "Verification Email", html);

    await mg.messages.create(process.env.MAILGUN_USER, options);
  } catch (error) {
    console.error(`Error in sendVerificationEmail method ${error.message}.`);
  }
};

export const sendForgotPasswordEmail = async (email, link) => {
  try {
    const html = forgotPasswordEmailTemplate.replace("{link}", link);
    const options = mailOptions(email, "Reset your password", html);

    await mg.messages.create(process.env.MAILGUN_USER, options);
  } catch (error) {
    console.error(`Error in sendForgotPasswordEmail method ${error.message}.`);
  }
};
