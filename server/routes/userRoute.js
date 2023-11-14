import express from "express";
const router = express.Router();

import { isAdmin, requiredSignin } from "../middlewares/authMiddleware.js";
import {
  userLogin,
  userSignup,
  userLogout,
  allUsers,
  getUserDetails,
  updateUser,
  deleteUser,
  userProfile,
} from "../controllers/userController.js";

//auth middleware
// router.use(authMiddleware);

//login route
router.post("/login", userLogin);

//signup route
router.post("/signup", userSignup);

//logout route
router.get("/logout", userLogout);

router.get("/me", requiredSignin, userProfile);

//Admin
router.route("/admin/users").get(requiredSignin, isAdmin, allUsers);
router
  .route("/admin/user/:id")
  .get(requiredSignin, isAdmin, getUserDetails)
  .put(requiredSignin, isAdmin, updateUser)
  .delete(requiredSignin, isAdmin, deleteUser);

export default router;
