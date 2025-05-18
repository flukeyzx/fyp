import { gemini } from "../configs/gemini.js";

export const generateThroughAI = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Please provide prompt.",
      });
    }

    const resp = await gemini.generateContent(
      `${prompt}. Don't write any boiler plate or unneccessary text. Format it as clean HTML or rich text with: A title, clearly separated sections using headings (only generate one heading h1 other should be just bold text as sub headings), bullet points for requirements and responsibilities. No markdown`
    );
    const result = resp.response.text();

    return res.status(200).json({
      success: true,
      message: "Prompt generated successfully.",
      result,
    });
  } catch (error) {
    console.log("Error in generateThroughAI controller.", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
