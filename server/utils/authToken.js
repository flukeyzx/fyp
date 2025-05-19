import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (id, name, email, res) => {
  const token = jwt.sign({ id, name, email }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });

  res.cookie("authToken", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    samesite: "strict",
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndSetCookie;
