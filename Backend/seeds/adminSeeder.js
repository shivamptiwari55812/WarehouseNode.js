import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { User } from "../model/authentication.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Connection error:", err));

const createAdmin = async () => {
  try {
    const existing = await User.findOne({ email: "admin@warehouse.com" });

    if (existing) {
      console.log("Admin already exists!");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    await User.create({
      name: "Warehouse Admin",
      email: "admin@warehouse.com",
      password: hashedPassword,
      isVerified: true,
      role: "admin",
    });

    console.log("Admin created successfully!");
  } catch (error) {
    console.error("Error creating admin:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

createAdmin();
