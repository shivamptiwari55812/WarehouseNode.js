import mongoose from "mongoose";


const authentication = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "newUser1",
        required: true,
    },
    name: {
          type: String,
          required: true,
    },
    password: {
        type: String,
        required: true,
    },
   
    
},{timestamps:true});

const newUser = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: true,
    },
    isVerified: { type: Boolean, default: false }
    
},{timestamps:true});


const otp = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "newUser1",
        required: true,
    },
    otp:{
        type:String,
        required:true,
    }
})





export const newUser1 = mongoose.model("newUser1", newUser);
export const Authentication = mongoose.model("Authentication", authentication);
export const otpDB = mongoose.model("otp_generate_and_save",otp);
