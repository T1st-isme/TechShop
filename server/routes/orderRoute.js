import express from "express";
const router = express.Router();
import { isAdmin, requiredSignin } from "../middlewares/authMiddleware.js";
import {
  addOrder,
  deleteOrder,
  getOrder,
  getOrders,
  myOrder,
  updateOrder,
} from "../controllers/OrderController.js";

//add order
router.post("/add-order", requiredSignin, addOrder);

//get order
router.get("/admin/get-orders", requiredSignin, getOrders);

router.get("/:id", requiredSignin, getOrder);

router.get("/me/order", requiredSignin, myOrder);

router
  .route("/admin/:id")
  .put(requiredSignin, updateOrder)
  .delete(requiredSignin, deleteOrder);

export default router;
