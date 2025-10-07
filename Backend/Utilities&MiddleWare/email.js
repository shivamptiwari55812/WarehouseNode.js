import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { User,otpDB } from "../model/authentication.js";
dotenv.config();

// Create a transporter
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.APP_PASSWORD, 
  },
});


export const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL, 
      to: to,                 
      subject: subject,
      text: text
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err.message);
      } else {
        console.log("Email sent successfully:", info.response);
      }
    });
  } catch (err) {
    console.log(err.message);
  }
};