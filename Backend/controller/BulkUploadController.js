import Product from "../model/Product.js";
import csv from "csv-parser";
import fs from "fs";

// Helper: parse CSV into products array
const parseCSV = (filePath, userId) => {
  return new Promise((resolve, reject) => {
    const products = [];
    const statusMap = {
      "In Stock": "in-stock",
      "Out of Stock": "out-of-stock",
      "Low Stock": "low-stock",
      "Active": "active",
      "Inactive": "inactive",
      "Discontinued": "discontinued",
    };

    fs.createReadStream(filePath)
      .pipe(csv())
      .on("data", (row) => {
        // Check for empty or invalid required fields
        if (!row.Name || !row.Category || !row.Supplier || !row.Location || !row.Stock || !row.Price) {
          console.warn(`Skipping row due to missing required fields: ${JSON.stringify(row)}`);
          return; // Skip this row
        }

        // Normalize the status value
        const statusNormalized = statusMap[row.Status] || "active";

        // Add the valid row data to the products array
        products.push({
          name: row.Name.trim(),
          category: row.Category.trim(),
          stock: Number(row.Stock) || 0,  // Default to 0 if invalid
          minStock: Number(row["Min Stock"]) || 0,
          maxStock: Number(row["Max Stock"]) || 0,
          price: Number(row.Price) || 0,
          supplier: row.Supplier.trim(),
          location: row.Location.trim(),
          status: statusNormalized,
          user: userId,
        });
      })
      .on("end", () => resolve(products))
      .on("error", (err) => reject(err));
  });
};


// Bulk upload controller
export const BulkUploadProducts = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "CSV file is required" });
    }

    const filePath = req.file.path;

    // Parse CSV and get the product data
    const products = await parseCSV(filePath, req.user.id);

    if (products.length === 0) {
      return res.status(400).json({ message: "No valid products found in CSV" });
    }

    // Insert products into the database
    const inserted = await Product.insertMany(products);

    // Delete the CSV file after processing
    fs.unlinkSync(filePath);

    return res.status(200).json({
      message: `${inserted.length} products uploaded successfully`,
      products: inserted,
    });
  } catch (err) {
    console.error("Bulk upload error:", err);
    return res.status(500).json({ message: "Error uploading products", err: err.message });
  }
};
