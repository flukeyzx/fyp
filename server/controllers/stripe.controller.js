import prisma from "../configs/prisma.js";
import { createCheckoutSession, stripeClient } from "../utils/stripe.js";
import { config } from "dotenv";

config({
  path: "./.env",
});

export const createStripeCheckoutSession = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (user.subscriptionPlan === "standard") {
      return res.status(400).json({
        success: false,
        message: "You already have an active monthly subscription.",
      });
    }

    const url = await createCheckoutSession(req.user.id);
    return res.status(200).json({
      success: true,
      message: "Upgraded to new plan successfully.",
      url,
    });
  } catch (error) {
    console.log(
      "Error in createStripeCheckoutSession controller.",
      error.message
    );
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const cancelStripeSubscription = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (!user.stripeCustomerId) {
      return res.status(404).json({
        success: false,
        message: "No active subscription found.",
      });
    }

    const subscriptions = await stripeClient.subscriptions.list({
      customer: user.stripeCustomerId,
      status: "active",
      limit: 1,
    });

    const subscription = subscriptions.data[0];
    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: "No active subscription found.",
      });
    }

    await stripeClient.subscriptions.cancel(subscription.id);

    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        subscriptionPlan: "free",
      },
    });

    return res.status(200).json({
      success: true,
      message: "Monthly subscription cancelled successfully.",
    });
  } catch (error) {
    console.log("Error in cancelStripeSubscription controller.", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const stripeWebhook = async (req, res) => {
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripeClient.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (error) {
    console.log("Webhook signature verification failed:", error.message);
    return res.status(400).send(`Webhook Error: ${error.message}`);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userId = session.client_reference_id;

    try {
      await prisma.user.update({
        where: { id: userId },
        data: {
          subscriptionPlan: "standard",
          stripeCustomerId: session.customer,
        },
      });

      await prisma.company.updateMany({
        where: {
          ownerId: req.user.id,
        },
        data: {
          subscriptionPlan: "standard",
          stripeCustomerId: session.customer,
        },
      });
    } catch (error) {
      console.error("Error updating subscription:", error.message);
    }
  }

  res.status(200).send("Webhook received.");
};
