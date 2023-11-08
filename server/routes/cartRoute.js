import express from "express";
const router = express.Router();
import { isAdmin, requiredSignin } from "../middlewares/authMiddleware.js";
import {
  addItemToCart,
  getCartItems,
  removeCartItems,
} from "../controllers/cartController.js";

router.post("/addToCart", requiredSignin, addItemToCart);

router.get("/getCartItems", requiredSignin, getCartItems);

router.post("/removeCartItem", requiredSignin, removeCartItems);

export default router;
