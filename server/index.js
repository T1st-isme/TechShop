import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import productRoute from "./routes/productRoute.js";
import dbConnect from "./dbConnect.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";

// Express app
const app = express();

//configure dotenv
dotenv.config();

// Connect to MongoDB
dbConnect();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    credentials: true,
  })
);

// Routes
app.use("/user", userRoute);
app.use("/category", categoryRoute);
app.use("/product", productRoute);

app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 8080;
app.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
