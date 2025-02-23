import { prisma } from "@/app/utils/config";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/config";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
      const session = await getServerSession(authOptions);
      if (!session || !session.user || !session.user.email) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 }
        );
      }
  
      // Parse JSON body safely
      let bodyData;
      try {
        bodyData = await req.json();
      } catch (error) {
        console.error("Invalid JSON body:", error);
        return NextResponse.json(
          { success: false, message: "Invalid JSON format" },
          { status: 400 }
        );
      }
  
      console.log("Received Body Data:", bodyData);
  
      // Validate required fields
      if (!bodyData || !bodyData.type || !bodyData.url || !bodyData.tags || !bodyData.notes || !bodyData.title) {
        return NextResponse.json(
          { success: false, message: "Missing required fields" },
          { status: 400 }
        );
      }
  
      // Get user from DB
      const existingUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });
  
      if (!existingUser) {
        return NextResponse.json(
          { success: false, message: "User not found" },
          { status: 404 }
        );
      }
  
      // Create Content
      const createdContent = await prisma.content.create({
        data: {
          title:bodyData.title,
          userId: existingUser?.id,
          type: bodyData?.type?.toUpperCase() || "YOUTUBE",
          url: bodyData?.url || "",
          tags: Array.isArray(bodyData.tags) ? bodyData.tags : [],
          notes: bodyData.notes || "",
        },
      });
  
      return NextResponse.json(
        { success: true, message: "Content created successfully", content: createdContent },
        { status: 201 }
      );
    } catch (error) {
      console.error("Error creating content:", error);
      return NextResponse.json(
        { success: false, message: "Internal server error" },
        { status: 500 }
      );
    }
  }
  
