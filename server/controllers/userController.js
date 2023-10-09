import { userModels } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//create token from user id
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.JWT_SECRET, {
    expiresIn: "3d",
  });
};

//signin user
const userLogin = async (req, res) => {
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
};

//signup user
const userSignup = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    //Validateion
    if (!firstname || !lastname || !email || !password) {
      throw new Error("Vui lòng nhập đầy đủ thông tin!!!");
    }
    if (!validator.isEmail(email)) {
      throw new Error("Email không hợp lệ!!!");
    }
    if (!validator.isStrongPassword(password)) {
      throw new Error("Mật khẩu không hợp lệ!!!");
    }
    const exist = await userModels.findOne({ email });
    if (exist) {
      throw new Error("Email đã tồn tại!!!");
    }
    //Hashing password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    //Create user
    const user = await userModels.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    res.status(200).json({ message: "Đăng ký thành công!!!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//testing
const testToken = async (req, res) => {
  const token = req.header("Authorization");
  const { email, password } = req.body;

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
