import { Router } from "express";
import passport from "../middlewares/passport.middleware.js";
import checkAuthentication from "../middlewares/authentication.middleware.js";
import {
  googleCallback,
  getUserProfile,
  signupUser,
  loginUser,
  logoutUser,
  verifyEmail,
  forgotPassword,
  resetPassword,
  resendVerificationCode,
} from "../controllers/auth.controller.js";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "select_account",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  googleCallback
);

router.get("/profile", checkAuthentication, getUserProfile);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/logout", checkAuthentication, logoutUser);
router.post("/verify-email", verifyEmail);
router.post("/resend-otp", resendVerificationCode);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
