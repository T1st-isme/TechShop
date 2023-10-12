import { userModels } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import asyncHandler from "express-async-handler";

//create token from user id
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

//signin user
const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    //Validateion
    if (!email || !password) {
      throw new Error("Email và Mật khẩu không được trống!!!");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Email không hợp lệ!!!");
    }
    const user = await userModels.findOne({ email });
    if (!user) {
      throw new Error("Email không đúng!!!");
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new Error("Mật khẩu không đúng!!!");
    }
    const token = createToken(user._id);
    res.status(200).send({
      message: "Đăng nhập thành công!!!",
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res
      .status(400)
      .send({ error: error.message, message: "Đăng nhập thất bại!!!" });
  }
});

//signup user
const userSignup = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  if (!firstname || !lastname || !email || !password) {
    res.status(400);
    throw new Error("Vui lòng nhập đầy đủ thông tin!!!");
  }

  if (!validator.isEmail(email)) {
    res.status(400);
    throw new Error("Email không hợp lệ!!!");
  }

  if (!validator.isLength(password, { min: 6 })) {
    res.status(400);
    throw new Error("Mật khẩu phải có ít nhất 6 ký tự!!!");
  }

  const exist = await userModels.findOne({ email });
  if (exist) {
    throw new Error("Email đã tồn tại!!!");
  }

  const user = await userModels.create({
    firstname,
    lastname,
    email,
    password,
  });

  const token = createToken(user._id);
  if (user) {
    const { lastname, email, password } = user;
    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400),
    });
    res.status(201).json({
      firstname,
      lastname,
      email,
      password,
      token,
    });
  } else {
    res.status(400);
    throw new Error("Đăng ký thất bại!!!");
  }
  res.send("Đăng ký thành công!!!");
});

//testing
const testToken = async (req, res) => {
  const token = req.header("Authorization");
  const { email } = req.body;

  try {
    const user = await userModels.findOne({ email }).select("");
    res.status(200).send({
      message: "Đăng nhập thành công!!!",
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { userLogin, userSignup, testToken };
