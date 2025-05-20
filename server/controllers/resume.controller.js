import prisma from "../configs/prisma.js";
import {
  analyzeResumeWithCustomPrompt,
  analyzeResumeWithGemini,
  getAtsScoreWithAI,
} from "../utils/gemini.js";
import { fetchFileFromCloudinary, parsePDF } from "../utils/parsePDF.js";
import { v2 as cloudinary } from "cloudinary";

export const uploadResume = async (req, res) => {
  try {
    const fileBuffer = req.file?.buffer;

    if (!fileBuffer) {
      return res
        .status(400)
        .json({ success: false, message: "Please upload a resume." });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { resume: true },
    });

    if (user?.resume) {
      const publicId = user.resume.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`resumes/${publicId}`);
    }

    const result = await new Promise((resolve, reject) => {
      const uploadedStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          folder: "resumes",
          type: "upload",
          access_mode: "public",
        },
        (error, result) => {
          if (error) {
            reject(new Error("Cloudinary upload failed: " + error.message));
          } else {
            resolve(result);
          }
        }
      );
      uploadedStream.end(fileBuffer);
    });

    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        resume: result.secure_url,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Resume uploaded successfully.",
      resume: result.secure_url,
    });
  } catch (error) {
    console.log("Error in uploadResume controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const analyzeSingleResume = async (req, res) => {
  try {
    const { resume } = req.body;

    if (!resume) {
      return res.status(400).json({
        success: false,
        message: "Please provide a resume to analyze.",
      });
    }

    const fetchedResume = await fetchFileFromCloudinary(resume);
    const resumeText = await parsePDF(fetchedResume);
    const result = await analyzeResumeWithGemini(resumeText);

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully.",
      result,
    });
  } catch (error) {
    console.log("Error in analyzeSingleResume controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const analyzeResumeWithPrompt = async (req, res) => {
  try {
    const { resume, prompt } = req.body;

    if (!resume || !prompt) {
      return res.status(400).json({
        success: false,
        message: "Please provide both resume and prompt.",
      });
    }

    const fetchedResume = await fetchFileFromCloudinary(resume);
    const resumeText = await parsePDF(fetchedResume);
    const result = await analyzeResumeWithCustomPrompt(resumeText, prompt);

    return res.status(200).json({
      success: true,
      message: "Resume analyzed successfully.",
      result,
    });
  } catch (error) {
    console.log("Error in analyzeResumeWithPrompt controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const getAtsScore = async (req, res) => {
  try {
    const { resume, description } = req.body;

    if (!resume || !description) {
      return res.status(400).json({
        success: false,
        message: "Please provide both resume and job description.",
      });
    }

    const fetchedResume = await fetchFileFromCloudinary(resume);
    const resumeText = await parsePDF(fetchedResume);
    const result = await getAtsScoreWithAI(resumeText, description);

    return res.status(200).json({
      success: true,
      message: "ATS score fetched successfully.",
      result,
    });
  } catch (error) {
    console.log("Error in getAtsScore controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

//TODO: Make this API later when filtering crieteria is defined.
export const filterResumes = async (req, res) => {
  try {
    const { resumes, prompt } = req.body;

    if (!resumes || !prompt) {
      return res.status(400).json({
        success: false,
        message: "Please provide resumes and a prompt.",
      });
    }
  } catch (error) {
    console.log("Error in filterResumes controller.", error.message);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};
