import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";

import { multerErrorHandler } from "./middlewares/multer.middleware.js";
import "./middlewares/cron.middleware.js";

import passport from "./middlewares/passport.middleware.js";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import jobRoutes from "./routes/job.routes.js";
import companyRoutes from "./routes/company.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import stripeRoutes from "./routes/stripe.routes.js";
import geminiRoutes from "./routes/gemini.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import notificationRoutes from "./routes/notification.routes.js";

export const app = express();
config({
  path: "./.env",
});

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cookieParser());
app.use("/api/stripe", stripeRoutes);
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/company", companyRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/gemini", geminiRoutes);
app.use("/api/applications", applicationRoutes);
app.use("/api/notifications", notificationRoutes);

app.use(multerErrorHandler);
