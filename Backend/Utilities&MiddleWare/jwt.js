import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();


// generating the token
const token = jwt.sign({ userId: user._id }, process.env.JWT_KEY, { expiresIn: "1d" });

// Verify token
try {
  const decoded = jwt.verify(token, process.env.JWT_KEY);
  console.log(decoded);
} catch (err) {
  console.error("Invalid token");
}

export default token;