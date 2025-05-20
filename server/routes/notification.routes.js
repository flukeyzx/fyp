import { Router } from "express";
import checkAuthentication from "../middlewares/authentication.middleware.js";
import {
  getAllNotifications,
  getUnReadNotifications,
  markNotificationsToRead,
} from "../controllers/notification.controller.js";

const router = Router();

router.get("/", checkAuthentication, getAllNotifications);
router.get("/unread", checkAuthentication, getUnReadNotifications);
router.post("/mark-read", checkAuthentication, markNotificationsToRead);

export default router;
