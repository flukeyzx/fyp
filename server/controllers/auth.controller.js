import bcrypt from "bcryptjs";
import crypto from "crypto";
import prisma from "../configs/prisma.js";
import generateTokenAndSetCookie from "../utils/authToken.js";
import {
  sendVerificationEmail,
  sendWelcomeEmail,
  sendForgotPasswordEmail,
} from "../email/emails.js";

export const googleCallback = async (req, res) => {
  if (req.user) {
    generateTokenAndSetCookie(req.user.id, req.user.name, req.user.email, res);
    return res
      .status(200)
      .redirect(`${process.env.FRONTEND_URL}?success=authenticated`);
  } else {
    res
      .status(401)
      .redirect(`${process.env.FRONTEND_URL}?error=authenticationError.`);
  }
};

export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email and password fields.",
      });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please provide correct email format.",
      });
    }

    if (name.length < 3) {
      return res.status(400).json({
        success: false,
        message: "Name must be atleast 3 characters long.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Password must be atleast 6 characters long.",
      });
    }

    const isAlreadyRegistered = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    const hashedPassword = await bcrypt.hash(password, 10);
    const emailVerificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const emailVerificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    if (isAlreadyRegistered && !isAlreadyRegistered.isVerified) {
      const updatedUser = await prisma.user.update({
        where: {
          id: isAlreadyRegistered.id,
        },
        data: {
          name,
          password: hashedPassword,
          emailVerificationToken,
          emailVerificationExpiry,
        },
      });

      const user = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      };

      await sendVerificationEmail(
        user.email,
        updatedUser.emailVerificationToken
      );

      return res
        .status(200)
        .json({ success: true, message: "OTP sent successfully.", user });
    }

    if (isAlreadyRegistered && isAlreadyRegistered.isVerified) {
      return res
        .status(400)
        .json({ success: false, message: "This email is already registered." });
    }

    const registeredUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        emailVerificationToken,
        emailVerificationExpiry,
      },
    });

    const user = {
      id: registeredUser.id,
      name: registeredUser.name,
      email: registeredUser.email,
    };

    await sendVerificationEmail(
      user.email,
      registeredUser.emailVerificationToken
    );

    return res
      .status(201)
      .json({ success: true, message: "User registered successfully.", user });
  } catch (error) {
    console.error(`Error in signupUser controller ${error.message}.`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email and password fields.",
      });
    }

    const isUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!isUser) {
      return res.status(404).json({
        success: false,
        message: "Account with this email not found! Please create one.",
      });
    }

    if (!isUser.password) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password! Try again." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, isUser.password);

    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect password! Try again." });
    }

    const user = {
      id: isUser.id,
      name: isUser.name,
      email: isUser.email,
    };

    generateTokenAndSetCookie(user.id, user.name, user.email, res);

    return res
      .status(200)
      .json({ success: true, message: "User logged in successfully.", user });
  } catch (error) {
    console.error(`Error in loginUser controller ${error.message}.`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const logoutUser = async (_, res) => {
  try {
    res.clearCookie("authToken");

    return res
      .status(200)
      .json({ success: true, message: "User logged out successfully." });
  } catch (error) {
    console.error(`Error in logoutUser controller ${error.message}.`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const getUserProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    const isPassword = user.password;

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Access denied! No authentication token provided.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully.",
      user: {
        ...user,
        password: undefined,
        hasPassword: isPassword,
      },
    });
  } catch (error) {
    console.error(`Error in getUserProfile controller ${error.message}.`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { email, token } = req.body;

    let user = await prisma.user.findFirst({
      where: {
        email,
        emailVerificationToken: token,
      },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP! Try again.",
      });
    }

    if (user.emailVerificationExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "Your OTP is expired please try again.",
      });
    }

    generateTokenAndSetCookie(user.id, user.name, user.email, res);
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isVerified: true,
      },
    });

    user = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    await sendWelcomeEmail(user.email);

    return res
      .status(200)
      .json({ success: true, message: "Email verified successfully.", user });
  } catch (error) {
    console.error(`Error in verifyEmail controller ${error.message}.`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await prisma.user.findUnique({
      where: { email },
    });

    if (user) {
      const emailVerificationToken = Math.floor(
        100000 + Math.random() * 900000
      ).toString();
      const emailVerificationExpiry = new Date(
        Date.now() + 24 * 60 * 60 * 1000
      );

      const updatedUser = await prisma.user.update({
        where: {
          email,
        },
        data: {
          emailVerificationToken,
          emailVerificationExpiry,
        },
      });

      user = {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
      };

      await sendVerificationEmail(
        user.email,
        updatedUser.emailVerificationToken
      );

      return res
        .status(200)
        .json({ success: true, message: "OTP resent successfully.", user });
    } else {
      throw new Error("Unexpected server error occurred.");
    }
  } catch (error) {
    console.error(`Error in resendVerification controller ${error.message}.`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "This email address is not registered.",
      });
    }

    const passwordResetToken = crypto.randomBytes(32).toString("hex");
    const passwordResetExpiry = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordResetToken,
        passwordResetExpiry,
      },
    });

    const link = `${process.env.FRONTEND_URL}/auth/reset-password?token=${passwordResetToken}`;

    await sendForgotPasswordEmail(user.email, link);

    return res.status(200).json({
      success: true,
      message: "Reset password link sent successfully.",
    });
  } catch (error) {
    console.error(`Error in forgotPassword controller ${error.message}.`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        passwordResetToken: token,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Invalid password reset link." });
    }

    if (!user.passwordResetExpiry || user.passwordResetExpiry < new Date()) {
      return res.status(400).json({
        success: false,
        message: "The password reset link has been expired.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        email: user.email,
      },
      data: {
        password: hashedPassword,
        passwordResetToken: null,
        passwordResetExpiry: null,
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "Password reset successfully." });
  } catch (error) {
    console.error(`Error in resetPassword controller ${error.message}.`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
      omit: {
        password: true,
        oAuthId: true,
        passwordResetToken: true,
        passwordResetExpiry: true,
        emailVerificationToken: true,
        emailVerificationExpiry: true,
        stripeCustomerId: true,
      },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully.",
      user,
    });
  } catch (error) {
    console.error(`Error in getProfile controller ${error.message}.`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error." });
  }
};
