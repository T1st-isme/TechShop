import express from "express";
const router = express.Router();

//importing the functions from the controller
import { userLogin, userSignup } from "../controllers/userController.js";

//login route
router.post("/signin", userLogin);

//signup route
router.post("/signup", userSignup);

export default router;
