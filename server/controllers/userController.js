import { userModels } from "../models/userModels.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.TOKEN_SECRET, {
    expiresIn: "3d",
  });
};

//login user
const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userModels.signIn(email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token, message: "Đăng nhập thành công!!!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//signup user
const userSignup = async (req, res, next) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const user = await userModels.signUp(firstname, lastname, email, password);
    const token = createToken(user._id);
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { userLogin, userSignup };
