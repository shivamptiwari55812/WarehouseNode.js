import Company from "../model/Company.js";
import { validationResult } from "express-validator";

export const getAllCompaniesAdmin = async (req, res) => {
  try {
    const companies = await Company.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: companies });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error fetching companies", error: err.message });
  }
};

export const createCompanyAdmin = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ success: false, message: "Validation errors", errors: errors.array() });

    if (!req.user || !req.user.id) return res.status(401).json({ success: false, message: "Unauthorized" });

    const companyData = { ...req.body, user: req.user.id };
    if (req.file) companyData.document = req.file.path;

    const company = await Company.create(companyData);
    res.status(201).json({ success: true, message: "Company created successfully", data: company });
  } catch (err) {
    console.error(err);
    if (err.code === 11000) return res.status(400).json({ success: false, message: "Company with this email already exists" });
    res.status(500).json({ success: false, message: "Error creating company", error: err.message });
  }
};

export const updateCompanyAdmin = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ success: false, message: "Company not found" });

    Object.assign(company, req.body);
    if (req.file) company.document = req.file.path;
    company.updatedAt = Date.now();

    await company.save();
    res.status(200).json({ success: true, message: "Company updated successfully", data: company });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error updating company", error: err.message });
  }
};

export const deleteCompanyAdmin = async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) return res.status(404).json({ success: false, message: "Company not found" });

    res.status(200).json({ success: true, message: "Company deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Error deleting company", error: err.message });
  }
};
