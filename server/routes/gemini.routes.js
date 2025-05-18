import { Router } from "express";
import checkAuthentication from "../middlewares/authentication.middleware.js";
import { generateThroughAI } from "../controllers/gemini.controller.js";

const router = Router();

router.post("/generate", checkAuthentication, generateThroughAI);

export default router;
