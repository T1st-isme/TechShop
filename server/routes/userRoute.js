import express from "express";
const router = express.Router();

import { isAdmin, requiredSignin } from "../middlewares/authMiddleware.js";
import {
  userLogin,
  userSignup,
  userLogout,
} from "../controllers/userController.js";

//auth middleware
// router.use(authMiddleware);

//login route
router.post("/signin", userLogin);

//signup route
router.post("/signup", userSignup);

//logout route
router.get("/logout", userLogout);

export default router;
