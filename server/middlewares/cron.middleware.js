import cron from "node-cron";
import prisma from "../configs/prisma.js";

cron.schedule("0 0 1 * *", async () => {
  try {
    await prisma.user.updateMany({
      data: {
        jobsAppliedThisMonth: 0,
        apiCallsThisMonth: 0,
      },
    });

    await prisma.company.updateMany({
      data: {
        jobsPostedThisMonth: 0,
      },
    });

    console.log("Monthly limits reset successfully.");
  } catch (error) {
    console.log("Error while resetting monthly limits", error.message);
  }
});
