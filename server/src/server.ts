import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";
import UserRouter from "./Routes/UserRoute";
import dotenv from "dotenv";
import ContentRouter from "./Routes/ContentRoute";

const MONGODB_URL = process.env.MONGODB_URL
const PORT = process.env.PORT || 4000
dotenv.config();

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/content", ContentRouter);

async function Main() {
  try {
    await mongoose
      .connect(
        `${MONGODB_URL}/Second-Brain`
      )
      .then(() => {
        console.log("Mongodb database is connected");
        app.listen(PORT, () => {
          console.log(`App is running on http://localhost:${PORT}`);
        });
      }).catch((error) => {
        console.log("Error Occured : ", error);
        
      })
  } catch (error) {
    console.log(error);
    return "Internal Server Error"
  }
}

Main();
