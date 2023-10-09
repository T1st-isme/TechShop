import jwt from "jsonwebtoken";
import { userModels } from "../models/userModel.js";

export async function authMiddleware(req, res, next) {
  // Get token from header
  const token = req.header("Authorization");

  // Check if token is present
  if (!token) {
    return res.status(401).json({ msg: "authorization require" });
  }

  try {
    // Verify token
    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request object
    req.userId = await userModels.findOne({ _id }).select("_id");

    // Call next middleware
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
}
