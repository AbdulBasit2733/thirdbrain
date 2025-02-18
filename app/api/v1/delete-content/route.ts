import { prisma } from "@/app/utils/config";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const session = await getServerSession();
    const email = session?.user?.email ?? "";

    const bodyData = await req.json();
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!existingUser) {
      return NextResponse.json({
        success: false,
        message: "UnAuthenicated",
      });
    }
    await prisma.content.delete({
      where: {
        userId: existingUser.id,
        id: bodyData.id,
      },
    });
    return NextResponse.json(
      {
        success: true,
        message: "Content deleted successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
