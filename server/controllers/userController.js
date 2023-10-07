import { userModels } from "../models/userModels.js";

//login user
const userLogin = async (req, res, next) => {
  res.json({ message: "User singin" });
};

//signup user
const userSignup = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user1 = await userModels.signUp(email, password);
    res.status(200).json({ email, user1 });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { userLogin, userSignup };
