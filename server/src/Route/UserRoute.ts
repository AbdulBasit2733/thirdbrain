import express, { Response } from "express";
import UserModel from "../Model/User";
import { z } from "zod";
import bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import { USER_JWT_SECRET } from "../config/config";
import AuthMiddleware from "../Middleware/AuthMiddleware";

const router = express.Router();

interface UserProps {
  username: string;
  password: string;
}

router.post("/auth/register", async (req, res) => {
  try {
    const bodyData = req.body;

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
    const result = userValidationSchema.safeParse(bodyData);

    if (!result.success) {
      const errorMessages = result.error.errors.map((err) => err.message);
      res.status(400).json({
        success: false,
        message: errorMessages,
      });
    }

    const user = await UserModel.findOne({ username: bodyData.username });

    if (user) {
      res.status(300).json({
        success: false,
        message: "Username already registered !",
      });
    }
    const salt = bcrypt.genSaltSync(12);
    const hash = bcrypt.hashSync(bodyData.password, salt);

    const newUser = await UserModel.create({
      username: bodyData.username,
      password: hash,
    });
    res.status(200).json({
      success: true,
      message: "Registered Successfully !",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});
router.post("/auth/login", async (req, res) => {
  try {
    const bodyData = req.body;
    const user = await UserModel.findOne({
      username: bodyData.username,
    });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "Username Or Password Is Inccorect",
      });
    } else {
      const isMatchedPassword = await bcrypt.compare(
        bodyData.password,
        user.password
      );

      if (!isMatchedPassword) {
        res.status(400).json({
          success: false,
          message: "Username or password is incorrect",
        });
        return;
      }

      const token = jwt.sign(
        {
          id: user._id,
        },
        USER_JWT_SECRET,
        { expiresIn: "1d" }
      );
      res
        .status(200)
        .cookie("token", token, {
          httpOnly: true, // Can't be accessed via JavaScript
          maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day expiration
          sameSite: "none",
          secure: process.env.NODE_ENV === "production", // Secure cookies in production only
        })
        .json({
          success: true,
          message: "Logged in successfully",
        });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

router.post("/auth/logout", async (req, res) => {
  try {
    res.status(200).cookie("token", "").json({
      success: true,
      message: "Logout Successfully",
    });
    res.end();
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred during logout",
    });
  }
});

router.get("/auth/check-auth", AuthMiddleware, (req, res) => {
  //@ts-ignore
  const user = req.user;
  res.status(200).json({
    success: true,
    message: "Authenticated Successfully",
    username: user.username,
  });
});

export default router;
