import { gemini } from "../configs/gemini.js";

export const analyzeResumeWithGemini = async (resume) => {
  const res = await gemini.generateContent(
    `Analyze this resume and extract key information: \n\n${resume}`
  );

  return res.response.text();
};

export const analyzeResumeWithCustomPrompt = async (resume, prompt) => {
  const res = await gemini.generateContent(`${prompt} : \n\n${resume}`);

  return res.response.text();
};
