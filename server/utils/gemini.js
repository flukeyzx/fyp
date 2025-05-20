import { gemini } from "../configs/gemini.js";

export const analyzeResumeWithGemini = async (resume) => {
  const res = await gemini.generateContent(
    `Analyze this resume and extract key information: \n\n${resume}`
  );

  return res.response.text();
};

export const analyzeResumeWithCustomPrompt = async (resume, prompt) => {
  const res = await gemini.generateContent(
    `Please respond in a concise and summarized manner.

    - For straightforward questions, answer directly in 3–5 lines.
    - For broad or detailed questions, provide only the most relevant and necessary information. Do not include unnecessary details or repeat the resume.
    - Focus on summarizing key points clearly and professionally.

    Question: ${prompt}

    Resume:
    ${resume}`
  );

  return res.response.text();
};

export const getAtsScoreWithAI = async (resume, description) => {
  const res = await gemini.generateContent(
    `
    You are an ATS scoring system.

    Compare the following resume with the job data: title, description, skills and experience and output only the ATS match score as a percentage (e.g., "78").

    Do NOT provide any explanation or text. Just return the number between 0 and 100.

    Resume:
    ${resume}

    Job Description:
    ${description}
    `
  );

  return res.response.text().trim();
};

export const generateProfileDataThroughResume = async (resume) => {
  const res = await gemini.generateContent(
    `Extract the following from the resume: skills (limit to 5–8 based on user experience), location (city, country), experience, profile, and education.

    Return only a valid JSON object in this exact structure — no extra text or explanation:

    {
      "user_description": "Concise summary under 400 words.",
      "skills": ["skill1", "skill2", "skill3", "skill4", "skill5"],
      "location": "city, country"
    }

    Resume:
    ${resume}`
  );

  return res.response.text();
};
