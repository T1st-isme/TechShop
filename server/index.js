import express from "express";
import { PORT, mongoUrl } from "./config.js";
import mongoose from "mongoose";
import { Person } from "./models/peopleModel.js";
import cors from "cors";
import userRoute from "./routes/userRoute.js";

//express app
const app = express();

//Middleware
app.use(express.json());

//CORS
app.use(cors());

//Routes
app.use("/user", userRoute);

app.get("/", (req, res) => {
  console.log(res);
  return res.status(234).send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

app.post("/persons", async (req, res) => {
  try {
    // Check if request body is valid
    if (!req.body.name || !req.body.age || !req.body.email) {
      return res.status(400).send({ message: "Invalid body" });
    }
    // Create new person
    const newPerson = {
      name: req.body.name,
      age: req.body.age,
      email: req.body.email,
    };
    const person = await Person.create(newPerson);
    return res.status(201).send(person);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

app.get("/persons", async (req, res) => {
  try {
    const persons = await Person.find({});
    return res.status(200).send(persons);
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
