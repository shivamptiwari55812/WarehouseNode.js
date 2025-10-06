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
    console.log(product)
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
    return res.status(200).json(productData);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    console.log(req.params)
    const { id } = req.params; // take from route, not body
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
     
    if (!deletedProduct) {
      return res.status(404).json({ message: "No product with given ID found" });
    }
console.log("Shivam")
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true } // return the updated doc & validate
    );
console.log(updatedProduct)
    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
console.log(updatedProduct)
    return res.status(200).json(updatedProduct);
    
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({ message: "Failed to update product", error });
  }
};