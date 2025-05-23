import { Router } from "express";
import {
  getProfileScore,
  updateUserPassword,
  updateUserProfile,
} from "../controllers/user.controller.js";
import checkAuthentication from "../middlewares/authentication.middleware.js";
import { imageUpload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/profile-score", checkAuthentication, getProfileScore);
router.post(
  "/update-profile",
  checkAuthentication,
  imageUpload.single("avatar"),
  updateUserProfile
);
router.post("/update-password", checkAuthentication, updateUserPassword);

export default router;
