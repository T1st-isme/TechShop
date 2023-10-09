import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { Person } from "./models/peopleModel.js";
import userRoute from "./routes/userRoute.js";
import dbConnect from "./dbConnect.js";

// Express app
const app = express();

//configure dotenv
dotenv.config();

// Connect to MongoDB
dbConnect();

// Middleware
app.use(express.json());

// CORS
app.use(cors());

// Routes
app.use("/user", userRoute);

// GET Request
app.get("/", (req, res) => {
  return res.status(200).send("Hello World");
});

// POST Request
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

// GET Request
app.get("/persons", async (req, res) => {
  try {
    const persons = await Person.find({});
    return res.status(200).send(persons);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ message: error.message });
  }
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
