import express from "express";
import { PORT, mongoUrl } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get("/", (req, res) => {
  console.log(res);
  return res.status(234).send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.post("/peoples", (req, res) => {
  try {
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoUrl)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });
