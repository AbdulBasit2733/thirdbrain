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
const PORT: number = process.env.PORT || 3000;

// Validate MongoDB URL
if (!MONGODB_URL) {
  console.error(
    "Error: MONGODB_URL is undefined. Please check your .env file."
  );
  process.exit(1);
}

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

const allowedOrigins = [
  "http://localhost:5173", // Local development
  process.env.FRONTEND_URL, // Deployed frontend
];

// app.use(cors())

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "PUT", "POST", "DELETE"],
    credentials: true,
  })
);

// API Routes
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/content", ContentRouter);

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
