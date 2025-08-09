import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Create a transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD, 
  },
});
