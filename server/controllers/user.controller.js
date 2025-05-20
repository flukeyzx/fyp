import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import prisma from "../configs/prisma.js";

export const updateUserProfile = async (req, res) => {
  try {
    const { name, skills, bio, location } = req.body;
    const avatarFile = req.file?.buffer;

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name && name.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Name should be at least 3 characters.",
      });
    }

    let avatarUrl = user.avatar;
    if (avatarFile) {
      if (user.avatar) {
        const publicId = user.avatar.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`avatars/${publicId}`);
      }

      const result = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: "avatars",
            width: 300,
            height: 300,
            crop: "fill",
            format: "jpg",
          },
          (error, result) => {
            if (error) {
              reject(new Error("Cloudinary upload failed: " + error.message));
            } else {
              resolve(result);
            }
          }
        );
        uploadStream.end(avatarFile);
      });

      avatarUrl = result.secure_url;
    }

    const data = {
      name: name || user.name,
      avatar: avatarUrl,
      skills: skills || user.skills,
      bio,
      location: location || user.location,
    };

    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data,
      omit: {
        password: true,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error(`Error in updateUserProfile controller: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const updateUserPassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({
        success: false,
        message: "Please provide a new password.",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({
        success: false,
        message: "New password must be atleast 6 characters long.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    if (!currentPassword || !user.password) {
      await prisma.user.update({
        where: {
          id: req.user.id,
        },
        data: {
          password: hashedPassword,
        },
      });

      return res.status(200).json({
        success: true,
        message: "New password has been set successfully.",
      });
    }

    if (currentPassword === newPassword) {
      return res.status(400).json({
        success: false,
        message: "You cannot set the same password again.",
      });
    }

    const isPasswordCorrect = bcrypt.compareSync(
      currentPassword,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        success: false,
        message: "Please provide correct current password.",
      });
    }

    await prisma.user.update({
      where: {
        id: req.user.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(`Error in updateUserPassword controller: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getProfileScore = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found.",
      });
    }

    let profileScore = 0;
    const bio = user.bio ? user.bio.length : 0;
    if (bio <= 5) {
      profileScore += 0;
    } else if (bio <= 30) {
      profileScore += 5;
    } else if (bio <= 50) {
      profileScore += 10;
    } else {
      profileScore += 20;
    }

    if (user.avatar) {
      profileScore += 20;
    }

    if (user.location) {
      profileScore += 20;
    }

    if (user.resume) {
      profileScore += 20;
    }

    const skills = user.skills ? user.skills.length : 0;
    if (skills === 1) {
      profileScore += 5;
    } else if (skills === 2) {
      profileScore += 10;
    } else if (skills === 3 || skills === 4) {
      profileScore += 15;
    } else if (skills >= 5) {
      profileScore += 20;
    }

    return res.status(200).json({
      success: true,
      message: "Profile Score fetched successfully.",
      profileScore,
    });
  } catch (error) {
    console.error(`Error in getProfileScore controller: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getUserPublicProfile = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide a userID",
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      omit: {
        password: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User's public profile fetched successfully.",
      user,
    });
  } catch (error) {
    console.error(`Error in getUserPublicProfile controller: ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
