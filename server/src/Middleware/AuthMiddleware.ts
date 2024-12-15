import * as jwt from "jsonwebtoken";
import { USER_JWT_SECRET } from "../config/config";
import UserModel from "../Model/User";

import type { JwtPayload } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";

const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Retrieve the token from cookies
    const token = req.cookies?.token;
    console.log(token);
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorized access. Token not provided.",
      });
      return;
    }

    // Verify the token and extract payload
    const decodedData = jwt.verify(token, USER_JWT_SECRET) as JwtPayload;

    // Fetch user details and attach them to the request object
    const user = await UserModel.findById(decodedData.id).select("-password");
    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found.",
      });
      return;
    }

    // Attach user information to the request object
    //@ts-ignore
    req.user = user;

    // Proceed to the next middleware
    next();
  } catch (error) {
    console.error("Authentication error:", error);

    // Handle token-related errors
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(403).json({
        success: false,
        message: "Invalid or expired token.",
      });
      return;
    }

    res.status(500).json({
      success: false,
      message: "Internal server error.",
    });
    return;
  }
};

export default AuthMiddleware;
