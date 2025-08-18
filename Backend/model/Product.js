import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
    },
    name: {
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    minStock:{
        type:Number,
        required:true,
    },
    maxStock:{
        type:Number,
        required:true,
    },
    supplier:{
        type:String,
        required:true,
    },
    description:{
        type: String,
        required: false,
    },
    status:{
        type:String,
        required:true,
        
    },
    location:{
        type: String,
        required: false,
    },
    lastUpdated: {
        type: String,
        required: false,
    },
    // warehouse: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "warehouseModel",
    //     required: true,
    // },
    
},{timestamps:true}
);

const Product = mongoose.model("Product", productSchema);
export default Product;