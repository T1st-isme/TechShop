import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
    cart: {
      type: Array,
      default: [],
    },
    role: {
      type: String,
      required: true,
      enum: ["admin", "user"],
      default: "user",
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

//Encrypt password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
  next();
});

export const userModels = Model("user", userSchema);
