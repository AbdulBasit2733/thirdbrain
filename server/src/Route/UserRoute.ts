import express from "express";
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

      res.cookie("token", token, {
        httpOnly: true,
        secure: false, // Set to true only for HTTPS in production
        sameSite: "none", // Or "none" if testing cross-origin cookies
        maxAge: 24 * 60 * 60 * 1000, // 1 day
      });
      res
        .status(200)
        .json({ success: true, message: "Logged in successfully" });

      return;
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
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