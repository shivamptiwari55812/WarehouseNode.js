import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  lastLogin: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
