import express from "express";
const router = express.Router();

import { isAdmin, requiredSignin } from "../middlewares/authMiddleware.js";
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
router.get("/test", requiredSignin, isAdmin, testToken);

export default router;
