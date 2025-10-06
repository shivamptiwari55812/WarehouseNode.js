import InventoryProduct from "../model/InventoryProduct.js";

// Get all products
export const getAllInventoryProducts = async (req, res) => {
  try {
    const { search, category, status } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { productId: { $regex: search, $options: "i" } },
      ];
    }

    if (category && category !== "all") query.category = category;
    if (status && status !== "all") query.status = status;

    const products = await InventoryProduct.find(query).sort({ createdAt: -1 });
    res.status(200).json(products); // Send raw array
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};

// Get single product by productId
export const getInventoryProductById = async (req, res) => {
  try {
    const product = await InventoryProduct.findOne({ productId: req.params.id });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product", error: err.message });
  }
};

// Add new product
export const addInventoryProduct = async (req, res) => {
  try {
    const product = await InventoryProduct.create(req.body);
    res.status(201).json(product); // Send raw product
  } catch (err) {
    res.status(500).json({ message: "Error adding product", error: err.message });
  }
};

// Update product
export const updateInventoryProduct = async (req, res) => {
  try {
    const product = await InventoryProduct.findOne({ productId: req.params.id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    Object.assign(product, req.body);
    await product.save();
    res.status(200).json(product); // Send updated product
  } catch (err) {
    res.status(500).json({ message: "Error updating product", error: err.message });
  }
};

// Delete product
export const deleteInventoryProduct = async (req, res) => {
  try {
    const product = await InventoryProduct.findOneAndDelete({ productId: req.params.id });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
};

// Update stock
export const updateInventoryStockByOne = async (req, res) => {
  try {
    const { stock } = req.body;
    const { id } = req.params;

    const product = await InventoryProduct.findOne({ productId: id });
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (typeof stock === "number") product.stock = stock;
    else return res.status(400).json({ message: "Invalid request body" });

    await product.save();
    res.status(200).json(product); // Send updated product
  } catch (err) {
    res.status(500).json({ message: "Error updating stock", error: err.message });
  }
};
