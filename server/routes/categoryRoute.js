import express from "express";
const router = express.Router();
import { isAdmin, requiredSignin } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryByName,
  updateCategoryById,
} from "../controllers/categoryController.js";

// GET all categories
router.get("/", getAllCategories);

// GET a single category by name
router.get("/:slug", getCategoryByName);

// CREATE a new category
router.post("/create-category", requiredSignin, isAdmin, createCategory);

// UPDATE a category by ID
router.patch("/:id", updateCategoryById);

// DELETE a category
router.delete("/:id", deleteCategory);

export default router;
