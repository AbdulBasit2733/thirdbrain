import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import UserModel from "../Models/User";
import { USER_JWT_SECRET } from "../config";

export const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Retrieve token from cookies
    const token = req.cookies?.token;
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized. Token not provided.",
      });
      return;
    }

    // Verify token
    const decodedData = jwt.verify(token, USER_JWT_SECRET) as { id: string }; // Add typing for decoded data
    if (!decodedData || !decodedData.id) {
      res.status(403).json({
        success: false,
        message: "Invalid token. Please log in again.",
      });
      return;
    }

    // Fetch user from database
    const user = await UserModel.findById(decodedData.id).select("-password");
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found. Please log in again.",
      });
      return;
    }

    // Attach user to request object
    (req as any).user = user; // Use `as any` to avoid TypeScript complaints
    next();
  } catch (error) {
    console.error("Error in AuthMiddleware:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
    return;
  }
};
