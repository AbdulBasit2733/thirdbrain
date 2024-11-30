import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from 'cors'
import UserRouter from "./Routes/UserRoute";
import dotenv from "dotenv";
import ContentRouter from "./Routes/ContentRoute";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use('/api/v1/users', UserRouter)
app.use('/api/v1/content', ContentRouter)

async function Main() {
  try {
    await mongoose
      .connect(
        "mongodb+srv://abdulbasitkhan8669:7A3qgPAHiZW0q6XY@second-brain-cluster.iszs7.mongodb.net/Second-Brain"
      )
      .then(() => {
        console.log("Mongodb database is connected");
        app.listen(3000, () => {
            console.log(`App is running on http://localhost:3000`);
        })
      });
  } catch (error) {
    console.log(error);
  }
}

Main()
