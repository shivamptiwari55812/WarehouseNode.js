import mongoose from "mongoose";

// Dummy auth middleware for testing
// Assigns a valid MongoDB ObjectId to req.user.id
export const verifyToken = (req, res, next) => {
  // For testing, create a new valid ObjectId
  req.user = { id: new mongoose.Types.ObjectId() };
  next();
};
