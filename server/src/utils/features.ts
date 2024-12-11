import { Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
export const setCookie = (
  user: {
    _id: any;
    username: string;
  },
  res: Response,
  message: string,
  statusCode = 200
) => {
  const token = jwt.sign({ _id: user._id }, process.env.USER_JWT_SECRET, {
    expiresIn: "7d",
  });
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message,
    });
};
