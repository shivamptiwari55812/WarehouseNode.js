import Product from "../model/Product.js";
import WarehouseModel from "../model/warehouse.js";
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
      !supplier ||
      !location
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
      user:req.user.id  
  });
    console.log("Product added:",product)
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
    // Testing: sab products fetch karne ke liye user filter hata diya
    const productData = await Product.find(); 
    console.log("Products fetched:", productData.length);
    return res.status(200).json(productData);
  } catch (err) {
    console.error("Error fetching products:", err);
    return res.status(500).json({ message: err.message });
  }
};




export const SendSingleProductDetails = async (req, res) => {
  try {
    const productData = await Product.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!productData) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Single product fetched:", productData.name);
    return res.status(200).json(productData);
  } catch (err) {
    console.error("Error fetching single product:", err);
    return res.status(500).json({ message: err.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id, user: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    console.log("Product updated:", updatedProduct.name);

    // frontend expects product object
    return res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
};

export const DeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const deletedProduct = await Product.findOneAndDelete({
      _id: id,
      user: req.user.id,
    });

    if (!deletedProduct) {
      return res.status(404).json({ message: "No product found" });
    }

    console.log("Product deleted:", id);

    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export const updateInventoryByID = async (req, res) => {
  try {
    const { id } = req.params;
    const { action } = req.body;
    const userId = req.user.id;

    if (!["increment", "decrement"].includes(action)) {
      return res.status(400).json({ message: "Invalid action" });
    }

    const product = await Product.findOne({ _id: id, user: userId });
    if (!product) {
      return res
        .status(404)
        .json({ message: "Product not found or not authorized" });
    }

    if (action === "increment") {
      product.stock += 1;
    } else if (action === "decrement") {
      if (product.stock > 0) {
        product.stock -= 1;
      } else {
        return res
          .status(400)
          .json({ message: "Stock already 0, cannot decrement further" });
      }
    }

    await product.save();

    console.log(`Stock ${action}ed:`, product.name, product.stock);
    return res.status(200).json(product);
  } catch (error) {
    console.error("Error updating inventory:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
    });
  }
};