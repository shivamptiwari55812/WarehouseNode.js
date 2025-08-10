import {Authentication,newUser1,otpDB} from "../model/authentication.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {transporter,sendEmail} from "../Utilities&MiddleWare/email.js";
import dotenv from "dotenv";
dotenv.config();

//Basic Login 
export const Login = async () => {
  try {
    if(!req.body.username || !req.body.password){
      return res.status(400).json({message:"Please Provide both credentials!"})
    }

    const User = await Authentication.findOne({username:name})
    if(!User){
      return res.status(400).json({message:"User not Found!"})
    }

    return res.status(200).json({message:"Login Successfull"})
  } 
  catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: `${err.message}` });
  }
};

const saltround = 10;


//registration ka code 

export const registration = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    console.log(req.body)
    if (!name || !email || !password) {
      return res.status(403).json({ message: "All fields are required" });
    }

    const existingUser = await newUser1.findOne({ email:email });
    
if (existingUser) {
  if (existingUser.isVerified) {
    return res.status(400).json({ message: "User already exists" });
  } else {
    
    const otp = OtpGenerator();
    await otpDB.updateOne({ userId: existingUser._id }, { otp });
    await sendEmail(req.body.email,`Verification Email `,`Dear ${req.body.name} \n Thank you for choosing us! Here is the Verification code \n
      OTP :- ${otp}\n Best regards\nTechnical Team\n TG`);
    return res.status(200).json({ message: "OTP resent" });
  }
}
    let otp = OtpGenerator()
    const hashedPassword = await bcrypt.hash(req.body.password, saltround);

    const newUser = await newUser1.create({
      name,
      email,
      password:hashedPassword,
      isVerified: false,
    })
    const otp1 = await otpDB.create({
      userId:newUser._id,
      otp:otp,
      
    })
   await sendEmail(req.body.email,`Verification Email `,`Dear ${req.body.name} \n Thank you for choosing us! Here is the Verification code \n
      OTP :- ${otp}\n Best regards\nTechnical Team\n TG`);
   

    return res.status(200).json({ "Here is the OTP ": otp });
  } catch (err) {
    console.log("Error:-" + err.message);
    return res.status(500).json({ message: `${err.message}` });
  }
};



//OTPverification for registration of new user


export const verifyOTP = async (req, res) => {
  try {
    const { otp } = req.body;
    if (!otp) {
      return res.status(400).json({ message: "Please enter the OTP" });
    }

    const existingOtp = await otpDB.findOne({ otp });
    if (!existingOtp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    const userDoc = await newUser1.findOne({ _id: existingOtp.userId });
    if (!userDoc) {
      return res.status(404).json({ message: "User not found for this OTP" });
    }

    userDoc.isVerified = true;
    const savedUser = await userDoc.save();

    // Remove OTP so it can't be reused
    await otpDB.deleteOne({ _id: existingOtp._id });

    res.status(200).json({ message: "User verified successfully", user: savedUser });
  } catch (err) {
    console.error("Error verifying OTP:", err);
    return res.status(500).json({ message: err.message });
  }
};



//otp generator Function
const OtpGenerator = () => {
  let otp = Math.floor(100000 + Math.random() * 900000); 
  console.log(otp);
  return otp;
};

