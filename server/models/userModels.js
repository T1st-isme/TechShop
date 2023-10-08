import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;
const Model = mongoose.model;

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      minlength: 3,
      maxlength: 20,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      trim: true,
      index: true,
      lowercase: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

//signup
userSchema.statics.signUp = async function (
  firstname,
  lastname,
  email,
  password
) {
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
  const exist = await this.findOne({ email });
  if (exist) {
    throw new Error("Email đã tồn tại!!!");
  }
  //Hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hashSync(password, salt);
  //Create user
  const user = await this.create({
    firstname,
    lastname,
    email,
    password: hashedPassword,
  });
  return user;
};

//signin
userSchema.statics.signIn = async function (email, password) {
  //Validateion
  if (!email || !password) {
    throw new Error("Email và Mật khẩu không được trống!!!");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Email không hợp lệ!!!");
  }
  const user = await this.findOne({ email });
  if (!user) {
    throw new Error("Email không đúng!!!");
  }
  const isMatch = await bcrypt.compareSync(password, user.password);
  if (!isMatch) {
    throw new Error("Mật khẩu không đúng!!!");
  }
  return user;
};

export const userModels = Model("user", userSchema);
