//login user
const userLogin = async (req, res, next) => {
  req.json({ message: "User login" });
};

//signup user
const userSignup = async (req, res, next) => {
  req.json({ message: "User signup" });
};

module.exports = {
  userLogin,
  userSignup,
};
