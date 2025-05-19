import { Router } from "express";
import checkAuthentication from "../middlewares/authentication.middleware.js";
import {
  getJobApplication,
  getAllJobApplications,
  submitJobApplication,
  updateApplicationStatus,
  getUserJobApplications,
} from "../controllers/application.controller.js";

const router = Router();

router.get("/user-applications", checkAuthentication, getUserJobApplications);
router.get("/:jobId", checkAuthentication, getAllJobApplications);
router.get(
  "/get-application/:applicationId",
  checkAuthentication,
  getJobApplication
);
router.post("/submit/:jobId", checkAuthentication, submitJobApplication);
router.patch("/:applicationId", checkAuthentication, updateApplicationStatus);

export default router;
