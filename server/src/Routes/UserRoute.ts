import express, { Request, Response, Router } from "express";
import UserModel from "../Models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import z from "zod";

const UserRouter: Router = express.Router();
const USER_JWT_SECRET = process.env.USER_JWT_SECRET || "ndhcydhshiueh1298431dh7d73";

// Registration Route
UserRouter.post(
  "/register",
  async (req: Request, res: Response): Promise<any> => {
    try {
      const bodyData = req.body;

      // Validation Schema
      const userValidationSchema = z.object({
        username: z
          .string()
          .min(4, { message: "Username must be greater than 4 characters" }),
        password: z
          .string()
          .min(8, "Password must be at least 8 characters long")
          .regex(/[A-Z]/, "Password must include at least one uppercase letter")
          .regex(/[a-z]/, "Password must include at least one lowercase letter")
          .regex(/[0-9]/, "Password must include at least one number")
          .regex(
            /[@$!%*?&]/,
            "Password must include at least one special character"
          ),
      });

      // Validate Input
      const result = userValidationSchema.safeParse(bodyData);
      if (!result.success) {
        const errorMessages = result.error.errors.map((err) => err.message);
        return res.status(400).json({
          success: false,
          message: errorMessages,
        });
      }

      // Check if User Already Exists
      const user = await UserModel.findOne({ username: bodyData.username });
      if (user) {
        return res.status(411).json({
          success: false,
          message: "Username is already registered",
        });
      }

      // Hash Password
      const salt = bcrypt.genSaltSync(12);
      const hash = bcrypt.hashSync(bodyData.password, salt);

      // Save User
      await UserModel.create({
        username: bodyData.username,
        password: hash,
      });

      res.status(201).json({
        success: true,
        message: "Registered successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Internal Server Error",
      });
    }
  }
);

// Login Route
UserRouter.post("/login", async (req: Request, res: Response): Promise<any> => {
  try {
    const bodyData = req.body;
    

    // Check if User Exists
    const user = await UserModel.findOne({ username: bodyData.username });
    if (!user) {
      return res.status(411).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Check Password
    const isMatchedPassword = bcrypt.compareSync(
      bodyData.password,
      user.password
    );
    if (!isMatchedPassword) {
      return res.status(403).json({
        success: false,
        message: "Invalid username or password",
      });
    }

    // Generate JWT Token
    const token = jwt.sign(
      {
        id: user._id,
      },
      USER_JWT_SECRET,
      { expiresIn: "1h" } // Optional: Token expiration
    );

    // Set Cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        // secure: process.env.NODE_ENV === "production",
        // sameSite: "strict",
      })
      .status(200)
      .json({
        success: true,
        message: "Logged in successfully",
        user:{
          username:user.username
        }
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});


export default UserRouter;
