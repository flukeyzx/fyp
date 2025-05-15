import prisma from "../configs/prisma.js";

export const createNotifications = async ({
  fromId = undefined,
  fromType = undefined,
  toId = undefined,
  toType = undefined,
  type,
  message,
}) => {
  if (!type || !message) {
    throw new Error("Notification type and message are required.");
  }

  if (!toId && type === "system") {
    throw new Error("Recipient is required for non-system notifications.");
  }

  return await prisma.notification.create({
    data: {
      fromId,
      fromType,
      toId,
      toType,
      type,
      message,
    },
  });
};
