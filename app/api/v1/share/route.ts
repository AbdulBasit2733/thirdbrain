import { authOptions, RandomHash } from "@/app/utils/config";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/utils/config";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.email) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
    });

    if (!existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    const { share } = await req.json();
    if (share) {
      await prisma.share.create({
        data: {
          hash: RandomHash(10),
          userId: existingUser.id,
        },
      });
    } else {
      // Find the share record first
      const shareRecord = await prisma.share.findFirst({
        where: {
          userId: existingUser.id,
        },
      });

      if (shareRecord) {
        await prisma.share.delete({
          where: {
            id: shareRecord.id,
          },
        });
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Updated Shareable Link",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
