import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../Models/User";
import dotenv from 'dotenv';
dotenv.config();
export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.cookies.token;
    // const authHeader = req.headers.authorization;
    // if (!authHeader) {
    //   res.status(401).json({ message: "No token provided" });
    //   return;
    // }
    // const token = authHeader.split(" ")[1];
    // console.log(authHeader);

    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized. Token not provided.",
      });
      return;
    }

    // Synchronous verification
    const decodedData = jwt.verify(
      token,
      process.env.USER_JWT_SECRET!
    ) as JwtPayload;

    if (!decodedData || !decodedData.id) {
      res.status(403).json({
        success: false,
        message: "Invalid token. Please log in again.",
      });
      return;
    }

    const user = await UserModel.findById(decodedData.id).select("-password");
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found. Please log in again.",
      });
      return;
    }
    //@ts-ignore
    req.user = user;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      res.status(401).json({
        success: false,
        message: "Session expired. Please log in again.",
      });
    } else {
      console.error("Error in AuthMiddleware:", error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
};
