import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleAIFileManager } from "@google/generative-ai/server";
import { config } from "dotenv";

config({
  path: "./.env",
});

export const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
export const googleFileManager = new GoogleAIFileManager(
  process.env.GEMINI_API_KEY
);

export const gemini = ai.getGenerativeModel({
  model: "gemini-2.0-flash",
});
