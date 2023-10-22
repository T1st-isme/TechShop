import jwt from "jsonwebtoken";
import { userModels } from "../models/userModel.js";

export const requiredSignin = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.send({
      success: false,
      message: "Bạn chưa đăng nhập!!!",
    });
  }
  const token = authorization.replace("Bearer ", "");
  jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
    if (err) {
      return res.send({
        success: false,
        message: "Bạn chưa đăng nhập!!!",
      });
    }
    const { _id } = payload;
    const user = await userModels.findById(_id);
    req.user = user;
    next();
  });
};

//admin access
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModels.findById(req.user._id);
    if (user.role != "admin") {
      return res.send({
        success: false,
        message: "Bạn không có quyền truy cập!!!",
      });
    }
    next();
  } catch (error) {
    res.status(500).send({
      error: error.message,
    });
  }
};
