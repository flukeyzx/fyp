import { Router } from "express";
import checkAuthentication from "../middlewares/authentication.middleware.js";
import {
  analyzeSingleResume,
  uploadResume,
  analyzeResumeWithPrompt,
} from "../controllers/resume.controller.js";
import { resumeUpload } from "../middlewares/multer.middleware.js";
import { checkApiCallingLimit } from "../middlewares/stripe.middleware.js";

const router = Router();

router.post(
  "/upload",
  checkAuthentication,
  resumeUpload.single("resume"),
  uploadResume
);
router.post(
  "/analyze",
  checkAuthentication,
  checkApiCallingLimit,
  analyzeSingleResume
);
router.post(
  "/analyze-with-prompt",
  checkAuthentication,
  checkApiCallingLimit,
  analyzeResumeWithPrompt
);

export default router;
