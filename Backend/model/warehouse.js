import mongoose from "mongoose";

const warehouse = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        match: [/.+\@.+\..+/, "Please enter a valid email address"],
    },
   
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        match: [/^\d{10}$/, "Please enter a valid 10-digit phone number"],
    },
    GSTIN:{
        type: String,
        required: true,
    },
    warehouseDocuments:{
        type:String,
        required:true,
    }
},{timestamps:true})

const warehouseModel = mongoose.model("warehouseModel",warehouse)
export default warehouseModel