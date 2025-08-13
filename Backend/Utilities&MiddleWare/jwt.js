import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email }, // payload
    process.env.JWT_KEY,                 // secret key
    { expiresIn: "1d" }                   // expiration
  );
};
