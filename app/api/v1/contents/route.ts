import { prisma } from "@/app/utils/config";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    const email = session?.user?.email ?? "";
    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "UnAuthenticated",
        },
        {
          status: 411,
        }
      );
    }
    const existingUser = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });
    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthenticated",
        },
        {
          status: 404,
        }
      );
    }

    const contents = await prisma.content.findMany({
      where: {
        userId: existingUser.id,
      },
      include: {
        user: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Fetched All Contents",
        data: contents,
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
      {
        status: 500,
      }
    );
  }
}
