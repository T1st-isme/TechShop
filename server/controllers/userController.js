import { userModels } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//create token from user id
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

//signin user
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Validateion
    if (!email || !password) {
      return res.status(404).send({
        success: false,
        message: "Email hoặc Mật khẩu không đúng!!!",
      });
    }
    if (!validator.isEmail(email)) {
      return res.send({ message: "Email không hợp lệ!!!" });
    }
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email chưa được đăng ký!!!",
      });
    }
    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      return res.status(200).send({
        success: false,
        message: "Mật khẩu không đúng!!!",
      });
    }
    const token = createToken(user._id);

    res.status(200).send({
      success: true,
      message: "Đăng nhập thành công!!!",
      user: {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Đăng nhập thất bại!!!",
      error: error.message,
    });
  }
};

//signup user
const userSignup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    if (!firstname || !lastname || !email || !password) {
      return res.send({ message: "Vui lòng điền đầy đủ thông tin!!!" });
    }

    if (!validator.isEmail(email)) {
      return res.send({ message: "Email không hợp lệ!!!" });
    }

    if (!validator.isLength(password, { min: 6 })) {
      res.send({ message: "Mật khẩu phải có ít nhất 6 ký tự!!!" });
    }

    //check user
    const exisitingUser = await userModels.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Email đã tồn tại!!!",
      });
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
      res.status(201).send({
        firstname,
        lastname,
        email,
        password,
        token,
        success: true,
        message: "Đăng ký thành công!!!",
      });
    }
  } catch (err) {
    res.status(500).send({
      success: false,
      message: "Đăng ký thất bại!!!",
      err,
    });
  }
};

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
