import { PrismaClient } from "@prisma/client";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NEXT_NODE_ENV !== "production") globalForPrisma.prisma = prisma;


export const authOptions: NextAuthOptions = {
    session: {
      strategy: "jwt",
    },
    providers: [
      GoogleProvider({
        clientId: process.env.NEXT_GOOGLE_CLIENT_ID!,
        clientSecret: process.env.NEXT_GOOGLE_CLIENT_SECRET!,
      }),
    ],
    callbacks: {
      async signIn({ user }) {
        if (user.email) {
          try {
            let existingUser = await prisma.user.findUnique({
              where: { email: user.email },
            });
  
            if (!existingUser) {
              existingUser = await prisma.user.create({
                data: {
                  email: user.email,
                  name: user.name || null,
                  image: user.image || null,
                  provider: "GOOGLE", // Ensure this matches Prisma enum type
                },
              });
            }
            return true;
          } catch (error) {
            console.error("Error during sign-in:", error);
            return false;
          }
        }
        return false;
      },
      async jwt({ token, user }) {
        if (user) {
          const dbUser = await prisma.user.findUnique({
            where: { email: user.email! },
          });
          if (dbUser) {
            token.id = dbUser.id; // Ensure type safety
          }
        }
        return token;
      },
      async session({ session, token }) {
        if (session.user) {
          session.user.id = token.id as string;
        }
        return session;
      },
    },
    pages: {
      signIn: "/auth/signIn",
    },
    secret: process.env.NEXTAUTH_SECRET,
  };