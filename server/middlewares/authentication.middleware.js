import jwt from "jsonwebtoken";

const checkAuthentication = async (req, res, next) => {
  try {
    const authToken =
      req.cookies.authToken || req.headers.authorization?.split(" ")[1];

    if (!authToken) {
      return res.status(400).json({
        success: false,
        message: "Access denied! No authentication token provided.",
      });
    }

    const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error(`Error in checkAuthentication middleware: ${error.message}`);
    const statusCode = error.name === "JsonWebTokenError" ? 401 : 500;
    return res.status(statusCode).json({
      success: false,
      message:
        statusCode === 401
          ? "Invalid or expired token."
          : "Internal server error.",
    });
  }
};

export default checkAuthentication;
