import Product from "../model/Product.js";

export const AddProduct = async (req, res) => {
  try {
    console.log(req.body);
    const {
      id,
      name,
      category,
      stock,
      minStock,
      maxStock,
      price,
      supplier,
      location,
      status,
    } = req.body;
    if (
      !name ||
      !category ||
      !stock ||
      !minStock ||
      !maxStock ||
      !price ||
      !supplier
    ) {
      return res.status(403).json({ message: "All fields are required" });
    }
    const product = await Product.create({
      id,
      name,
      category,
      stock,
      minStock,
      maxStock,
      price,
      supplier,
      location,
      status,
    });
    return res
      .status(200)
      .json({ message: "Product added successfully", product });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Something went wrong", err });
  }
};

export const SendProductDetails = async (req, res) => {
  try {
    const productData = await Product.find();
    return res.status(200).json({ message: "Sent Successfully", productData });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    console.log(req.body);
    const { productId } = req.body;
    if (!productId) {
      return res.status(403).json({ Message: "Product ID is not sent" });
    }
    const product = await Product.findById(productId);
    if (!DeleteProduct) {
      return res
        .status(403)
        .json({ message: "No product with Given id found" });
    }
    const deleteProduct = await Product.findOneAndDelete(product);
    return res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.log(error);
    return res.json(error.message);
  }
};
