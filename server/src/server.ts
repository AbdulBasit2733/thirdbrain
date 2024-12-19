import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import * as dotenv from "dotenv";
import UserRoute from "./Route/UserRoute";
import ContentRoute from "./Route/ContentRoute";

dotenv.config();

const MONGODB_URL = `${process.env.MONGODB_URL}/thirdbrain`;
const PORT = process.env.PORT || 3000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', 'https://thirdbrain-kohl.vercel.app');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // For preflight requests (OPTIONS method)
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Your API logic
  res.status(200).json({ message: 'CORS setup successful' });
}


const app = express();
app.use(handler)
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: FRONTEND_URL, // Allow this specific origin
    methods: "GET, POST, PUT, DELETE", // Allowed methods
    credentials: true, // Include credentials if needed
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
