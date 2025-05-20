import express, { Router } from "express";
import checkAuthentication from "../middlewares/authentication.middleware.js";
import {
  createStripeCheckoutSession,
  cancelStripeSubscription,
  stripeWebhook,
} from "../controllers/stripe.controller.js";

const router = Router();

router.post(
  "/create-checkout-session",
  checkAuthentication,
  createStripeCheckoutSession
);

router.post(
  "/cancel-subscription",
  checkAuthentication,
  cancelStripeSubscription
);

router.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  stripeWebhook
);

export default router;
