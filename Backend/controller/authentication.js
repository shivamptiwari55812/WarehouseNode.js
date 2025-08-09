import {Authentication,newUser1,otpDB} from "../model/authentication.js";
import bcrypt from "bcrypt";


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
    if (existingUser){
      return res.status(400).json({ message: "User already exists" });
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

    return res.status(200).json({ "Here is the OTP ": otp });
  } catch (err) {
    console.log("Error:-" + err.message);
    return res.status(500).json({ message: `${err.message}` });
  }
};



//OTPverification for registration of new user


export const verifyOTP = async (req, res) => {
  try {
    if (!req.body.otp) {
      return res.status(403).json({ message: "Please Enter the OTP" });
    }
    console.log(req.body)

    const existingUser = await otpDB.findOne({ otp: req.body.otp });
    if (!existingUser) {
      return res.status(400).json({ message: "Invalid OTP" });
    }
    const newUser = await newUser1.findOne({ _id: existingUser.userId });
    newUser.isVerified = true;
    const user = await newUser.save();
    res.status(200).json({ message: "User Created Successfully", user });
  } catch (err) {
    console.log("Error:-" + err.message);
    return res.status(500).json({ message: `${err.message}` });
  }
};



//otp generator Function
const OtpGenerator = () => {
  let otp = Math.floor(100000 + Math.random() * 900000); 
  console.log(otp);
  return otp;
};


