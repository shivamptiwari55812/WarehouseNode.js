import Product from "../model/Product.js"

export const AddProduct= async(req,res)=>{
    try{
        console.log(req.body)
        const {id,name,category,stock,minStock,maxStock,price,supplier,location,description,lastUpdated,status}=req.body;
        if(!name || !category || !stock || !minStock || !maxStock || !price || !supplier || !description){
            return res.status(403).json({message:"All fields are required"});
        }
        const product=await Product.create({id,name,category,stock,minStock,maxStock,price,supplier,location,description,lastUpdated,status});
        return res.status(200).json({message:"Product added successfully",product});
    }catch(err){
        console.log(err)
        return res.status(500).json({message:"Something went wrong",err});
    }
}