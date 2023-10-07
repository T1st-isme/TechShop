import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const Schema = mongoose.Schema;
const Model = mongoose.model;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.signUp = async function (email, password) {
  if (!email || !password) {
    throw new Error("Email và Mật khẩu không được trống!!!");
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
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hashedPassword });
  return user;
};

export const userModels = Model("user", userSchema);
