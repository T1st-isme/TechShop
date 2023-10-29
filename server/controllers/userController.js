import { userModels } from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { createToken, genRefreshToken } from "../middlewares/authMiddleware.js";

//signin user
const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    //Validateion
    if (!email || !password) {
      return res.send({
        success: false,
        message: "Email hoặc Mật khẩu không đúng!!!",
      });
    }
    if (!validator.isEmail(email)) {
      return res.send({ message: "Email không hợp lệ!!!" });
    }
    const user = await userModels.findOne({ email });
    if (!user) {
      return res.send({
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
    // Tách role ra khỏi response
    const { role, refreshToken, ...userData } = user.toObject();
    const token = createToken(user._id, user.role);
    const rToken = genRefreshToken(user._id);
    await userModels.findByIdAndUpdate(
      user._id,
      { refreshToken: rToken },
      { new: true }
    );
    res.cookie("refreshToken", rToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400 * 3),
    });
    res.status(200).send({
      success: true,
      message: "Đăng nhập thành công!!!",
      user: userData,
      token,
      refreshToken: rToken,
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

    const user = await userModels.create(req.body);

    const token = createToken(user._id);
    if (user) {
      const { lastname, email, password } = user;
      res.cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + 1 * 86400 * 1000),
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

const userLogout = async (req, res) => {
  const cookie = req.cookies;
  try {
    if (!cookie?.refreshToken) throw new Error("Không có refresh token!!!");
    // Xóa refresh token ở db
    await userModels.findOneAndUpdate(
      { refreshToken: cookie.refreshToken },
      { refreshToken: "" },
      { new: true }
    );
    // Xóa refresh token ở cookie trình duyệt
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
    });
    return res.status(200).json({
      success: true,
      message: "Đăng xuất thành công!!!",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Lỗi Server!!!",
      error: error.message,
    });
  }
};

//testing
const testToken = async (req, res) => {
  res.send({ success: true, message: "Testing....." });
};

export { userLogin, userSignup, userLogout, testToken };
