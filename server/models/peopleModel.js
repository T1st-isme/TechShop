import mongoose from "mongoose";

const personSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  email: String,
});

export const person = mongoose.model("person", personSchema);
