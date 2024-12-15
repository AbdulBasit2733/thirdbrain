import * as jwt from "jsonwebtoken";
import { USER_JWT_SECRET } from "../config/config";
import UserModel from "../Model/User";

import type { JwtPayload } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const AuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({
        success: false,
        message: "Unauthorize",
      });
      return;
    }
    const decodedData: JwtPayload = jwt.verify(
      token,
      USER_JWT_SECRET
    ) as JwtPayload;
    const user = await UserModel.findById(decodedData.id).select('-password');
    //@ts-ignore
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: "Bad Request",
    });
    return;
  }
};
export default AuthMiddleware;
