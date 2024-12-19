import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import UserRoute from "./Route/UserRoute";
import ContentRoute from "./Route/ContentRoute";
import { FRONTEND_URL } from "./config/config";

dotenv.config();

const MONGODB_URL = `${process.env.MONGODB_URL}/thirdbrain`;
const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [`${FRONTEND_URL}`],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use("/api/v1/users", UserRoute);
app.use("/api/v1/contents", ContentRoute);

async function Main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB database is connected");

    // Start the server
    app.listen(PORT, () => {
      console.log(`App is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Error occurred while connecting to MongoDB:", error);
  }
}

// Start the application
Main();
