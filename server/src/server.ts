import express, { Application, Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

// Import your routes
import UserRouter from "./Routes/UserRoute";
import ContentRouter from "./Routes/ContentRoute";

// Load environment variables
dotenv.config();

// Environment variables
const MONGODB_URL: string = process.env.MONGODB_URL || "";
const PORT: number = parseInt(process.env.PORT || "4000", 10);

// Validate MongoDB URL
if (!MONGODB_URL) {
  console.error("Error: MONGODB_URL is undefined. Please check your .env file.");
  process.exit(1);
}

const app: Application = express();

// Middleware setup
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

// API Routes
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/content", ContentRouter);

// // Default route to check server status
// app.get("/", (req: Request, res: Response) => {
//   res.send("Server is running...");
// });


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
    process.exit(1); // Exit the application if the database connection fails
  }
}

// Start the application
Main();
