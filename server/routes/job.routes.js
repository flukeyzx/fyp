import { Router } from "express";
import checkAuthentication from "../middlewares/authentication.middleware.js";
import {
  createJob,
  deleteJob,
  getAllJobs,
  getJob,
  getSavedJobs,
  getCompanyJobs,
  saveJob,
  updateJob,
  submitJobApplication,
} from "../controllers/job.controller.js";
import { checkJobCreationLimit } from "../middlewares/stripe.middleware.js";

const router = Router();

router.get("/", checkAuthentication, getAllJobs);
router.get("/:jobId", getJob);
router.get("/company/:companyId", checkAuthentication, getCompanyJobs);
router.post("/saved-jobs", checkAuthentication, getSavedJobs);
router.post("/create", checkAuthentication, createJob);
router.post("/update/:jobId", checkAuthentication, updateJob);
router.post("/save-job/:jobId", checkAuthentication, saveJob);
router.delete("/:jobId", checkAuthentication, deleteJob);

router.post("/apply/:jobId", checkAuthentication, submitJobApplication);

export default router;
