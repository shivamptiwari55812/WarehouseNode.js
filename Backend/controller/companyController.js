import Company from "../model/Company.js";
import { validationResult } from "express-validator";

// Get all companies
export const getAllCompanies = async (req, res) => {
  try {
    const { search, type, status } = req.query;
    let query = {};

    // Search functionality
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { contact: { $regex: search, $options: "i" } },
        { type: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by type
    if (type) {
      query.type = type;
    }

    // Filter by status
    if (status) {
      query.status = status;
    }

    const companies = await Company.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: companies.length,
      data: companies,
      
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching companies",
      error: error.message,
    });
  }
};

// Get single company
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      data: company,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching company",
      error: error.message,
    });
  }
};

// Create new company
export const createCompany = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation errors",
        errors: errors.array(),
      });
    }

    const companyData = { ...req.body };

    // Handle file upload
    if (req.file) {
      companyData.document = req.file.path;
    }

    const company = await Company.create(companyData);

    res.status(201).json({
      success: true,
      message: "Company created successfully",
      data: company,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Company with this email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error creating company",
      error: error.message,
    });
  }
};

// Update company
export const updateCompany = async (req, res) => {
  try {

    console.log(req.body)
    const updateData = {};

    if (req.body.name) updateData.name = req.body.name.trim();
    if (req.body.contact) updateData.contact = req.body.contact.trim();
    if (req.body.email) updateData.email = req.body.email.toLowerCase().trim();
    if (req.body.phone) updateData.phone = req.body.phone.trim();
    if (req.body.address) updateData.address = req.body.address.trim();
    if (req.body.type) updateData.type = req.body.type;
    if (req.body.status) updateData.status = req.body.status;
    if (req.body.GSTIN) updateData.GSTIN = req.body.GSTIN.trim();

    // Handle file upload
    if (req.file) {
      updateData.document = req.file.path;
    }

    updateData.updatedAt = new Date();

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      data: company,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error updating company",
      error: error.message,
    });
  }
};

// Delete company
export const deleteCompany = async (req, res) => {
  try {
    const order = await Order.findOne({ company: req.params.id });
    if (order) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete company with existing orders",
      });
    }

    const company = await Company.findByIdAndDelete(req.params.id);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Company deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting company",
      error: error.message,
    });
  }
};
