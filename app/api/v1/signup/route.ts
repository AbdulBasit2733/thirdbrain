import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import bcrypt from "bcrypt";
const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const schema = z.object({
      email: z.string().email("Invalid email address"),
      password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(64, "Password must be less than 64 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/\d/, "Password must contain at least one number")
        .regex(
          /[@$!%*?&]/,
          "Password must contain at least one special character (@$!%*?&)"
        ),
    });

    const validationResult = schema.safeParse({ email, password });

    if (!validationResult.success) {
      const errorMessages = validationResult.error.errors.map(
        (err) => err.message
      );
      return NextResponse.json(
        {
          success: false,
          message: errorMessages,
        },
        { status: 300 }
      );
    }

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const isUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (isUser) {
      return NextResponse.json(
        {
          success: false,
          message: ["Email is Already Registered !"],
        },
        {
          status: 300,
        }
      );
    }
    await prisma.user.create({
      data: { email, password: hashedPassword },
    });

    return NextResponse.json({
      success: true,
      message: "You have been signed up.",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Signup failed. Try again." },
      { status: 500 }
    );
  }
}
