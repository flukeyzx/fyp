import { config } from "dotenv";
import prisma from "../configs/prisma.js";
import { stripeClient } from "../utils/stripe.js";

config({
  path: "./.env",
});

export const checkStripeSubscription = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Access Denied! No Authentication token provided.",
      });
    }

    if (user.subscriptionPlan === "free") {
      req.user.subscriptionPlan = "free";
      return next();
    }

    if (!user.stripeCustomerId) {
      return res.status(403).json({
        success: false,
        message: "Stripe subscription is required to access this feature.",
      });
    }

    const subscriptions = await stripeClient.subscriptions.list({
      customer: user.stripeCustomerId,
      status: "all",
    });

    const activeSubscription = subscriptions.data.find(
      (sub) => sub.status === "active"
    );

    if (!activeSubscription) {
      await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          subscriptionPlan: "free",
        },
      });
      req.user.subscriptionPlan = "free";
      return next();
    }

    const plan = activeSubscription.items.data[0].price.id;
    req.user.subscriptionPlan = plan;
    next();
  } catch (error) {
    console.log("Error in checkStripeSubscription middleware.", error.message);
    throw new Error("Error while checking stripe subscription.");
  }
};

export const checkJobApplicationLimit = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        subscriptionPlan: true,
        jobsAppliedThisMonth: true,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const jobApplicationLimit = user.subscriptionPlan === "free" ? 5 : Infinity;

    if (user.jobsAppliedThisMonth >= jobApplicationLimit) {
      return res.status(403).json({
        success: false,
        message: "Job Application limit reached for this month.",
      });
    }

    next();
  } catch (error) {
    console.log("Error in checkJobApplicationLimit middleware.", error.message);
    throw new Error("Error while checking job application limit.");
  }
};

export const checkJobCreationLimit = async (req, res, next) => {
  try {
    const company = await prisma.company.findUnique({
      where: {
        ownerId: req.user.id,
      },
      include: {
        owner: {
          select: {
            subscriptionPlan: true,
          },
        },
      },
    });

    if (!company) {
      return res
        .status(404)
        .json({ success: false, message: "Company not found." });
    }

    const jobCreationLimit =
      company.owner.subscriptionPlan === "free" ? 5 : Infinity;

    if (company.jobsPostedThisMonth >= jobCreationLimit) {
      return res.status(403).json({
        success: false,
        message: "Job creation limit reached for this month.",
      });
    }

    next();
  } catch (error) {
    console.log("Error in checkJobApplicationLimit middleware.", error.message);
    throw new Error("Error while checking job creation limit.");
  }
};

export const checkApiCallingLimit = async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      select: {
        subscriptionPlan: true,
        apiCallsThisMonth: true,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const apiCallingLimit = user.subscriptionPlan === "free" ? 5 : Infinity;

    if (user.apiCallsThisMonth >= apiCallingLimit) {
      return res.status(403).json({
        success: false,
        message: "AI features limit reached for this month.",
      });
    }

    next();
  } catch (error) {
    console.log("Error in checkJobApplicationLimit middleware.", error.message);
    throw new Error("Error while checking AI api calling limit.");
  }
};
