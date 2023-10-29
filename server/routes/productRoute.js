import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductByName,
  getProducts,
  updateProduct,
  uploadImage,
} from "../controllers/productController.js";
import { isAdmin, requiredSignin } from "../middlewares/authMiddleware.js";
import uploader from "../config/cloudinary.config.js";

const router = express.Router();

// GET all products
router.get("/", getProducts);

// GET a single product
router.get("/:slug", getProductByName);

// CREATE a product
router.post("/", createProduct);

// UPDATE a product
router.put("/:id", updateProduct);

// DELETE a product
router.delete("/:id", deleteProduct);

//Upload images
router.post("/upload/:id", uploader.single("image"), uploadImage);
export default router;
