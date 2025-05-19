import Stripe from "stripe";
import { config } from "dotenv";

config({ path: "./.env" });

export const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createCheckoutSession = async (userId) => {
  try {
    const session = await stripeClient.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: "price_1R0LllRrpyGe7QVbG0MTXmNu",
          quantity: 1,
        },
      ],
      client_reference_id: userId,
      success_url: `${process.env.FRONTEND_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-cancel`,
    });

    return session.url;
  } catch (error) {
    console.log("Error in createCheckoutSession method.", error.message);
    throw new Error("Error while creating a Stripe checkout session.");
  }
};
