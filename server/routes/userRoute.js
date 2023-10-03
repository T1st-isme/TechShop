import express from "express";
const router = express.Router();

//importing the functions from the controller
import { userLogin, userSignup } from ("../controllers/userController");

//login route
router.get("/login", userLogin);

//signup route
router.get("/signup", userSignup);

module.exports = router;
