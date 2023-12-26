import express from 'express'
import {
  createProduct,
  deleteProduct,
  getProductByName,
  getProducts,
  updateProduct,
  uploadImage,
  getProductByID,
  AdGetProducts
} from '../controllers/productController.js'
import { isAdmin, requiredSignin } from '../middlewares/authMiddleware.js'
import uploadCloud from '../config/cloudinary.config.js'

const router = express.Router()

// GET all products
router.get('/', getProducts)

router.get('/admin', AdGetProducts)

// GET a single product
router.get('/:slug', getProductByName)

// GET a single product
// router.get("/:id", getProductByID);

// CREATE a product
router.post('/', uploadCloud, createProduct)

// UPDATE a product
router.put('/:slug', uploadCloud, updateProduct)

// DELETE a product
router.delete('/:id', deleteProduct)

// Upload images
router.post('/upload/:id', uploadCloud, uploadImage)
export default router
