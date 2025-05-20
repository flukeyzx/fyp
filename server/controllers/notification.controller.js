import prisma from "../configs/prisma.js";

export const getAllNotifications = async (req, res) => {
  try {
    const company = await prisma.company.findMany({
      where: {
        ownerId: req.user.id,
      },
    });

    const notifications = await prisma.notification.findMany({
      where: {
        OR: [
          {
            toId: req.user.id,
          },
          company
            ? {
                toId: company.id,
              }
            : {},
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!notifications) {
      return res.status(404).json({
        success: false,
        message: "There are no notifications.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Notifications fetched successfully.",
      notifications,
    });
  } catch (error) {
    console.log("Error in getAllNotifications controller.", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const getUnReadNotifications = async (req, res) => {
  try {
    const company = await prisma.company.findUnique({
      where: {
        ownerId: req.user.id,
      },
      select: {
        id: true,
      },
    });

    const notifications = await prisma.notification.findMany({
      where: {
        OR: [
          {
            toId: req.user.id,
            isRead: false,
          },
          company
            ? {
                toId: company.id,
                isRead: false,
              }
            : {},
        ],
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!notifications) {
      return res.status(404).json({
        success: false,
        message: "There are no unread notifications.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Unread notifications fetched successfully.",
      notifications,
    });
  } catch (error) {
    console.log("Error in getUnReadNotifications controller.", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};

export const markNotificationsToRead = async (req, res) => {
  try {
    const { notificationsIds } = req.body;

    if (
      !notificationsIds ||
      !Array.isArray(notificationsIds) ||
      notificationsIds.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid notificationsIds",
      });
    }

    await prisma.notification.updateMany({
      where: {
        id: {
          in: notificationsIds,
        },
      },
      data: {
        isRead: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Notifications marked as read.",
    });
  } catch (error) {
    console.log("Error in markNotificationToRead controller.", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
  }
};
