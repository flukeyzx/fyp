import { gemini } from "../configs/gemini.js";
import prisma from "../configs/prisma.js";
import {
  analyzeResumeWithGemini,
  generateProfileDataThroughResume,
} from "../utils/gemini.js";
import { fetchFileFromCloudinary, parsePDF } from "../utils/parsePDF.js";

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

export const generateThroughResume = async (req, res) => {
  try {
    const { resume } = req.body;

    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "Please provide resume.",
      });
    }

    const fetchedResume = await fetchFileFromCloudinary(resume);
    const resumeText = await parsePDF(fetchedResume);
    const result = await generateProfileDataThroughResume(resumeText);

    const jsonStart = result.indexOf("{");
    const jsonEnd = result.lastIndexOf("}") + 1;
    const cleanJsonString = result.slice(jsonStart, jsonEnd);

    let profileData;
    try {
      profileData = JSON.parse(cleanJsonString);
    } catch (error) {
      console.error("Failed to parse Gemini response:", result);
      return res.status(500).json({
        success: false,
        message: "Failed to parse AI response.",
      });
    }

    const { user_description, skills, location } = profileData;

    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        bio: user_description,
        skills: skills,
        location,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profile data generated successfully.",
    });
  } catch (error) {
    console.log("Error in generateThroughResume controller.", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
