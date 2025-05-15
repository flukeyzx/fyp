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

    const resp = await gemini.generateContent(`${prompt}`);
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
