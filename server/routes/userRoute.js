import express from "express";
const router = express.Router();

import { authMiddleware } from "../middlewares/authMiddleware.js";
import {
  userLogin,
  userSignup,
  testToken,
} from "../controllers/userController.js";

//auth middleware
// router.use(authMiddleware);

//login route
router.post("/signin", userLogin);

//signup route
router.post("/signup", userSignup);

//get user
router.get("/me", testToken);

export default router;
