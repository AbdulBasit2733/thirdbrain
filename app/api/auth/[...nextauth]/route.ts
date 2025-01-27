import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt", // Using JWT-based sessions
  },
  providers: [
    CredentialsProvider({
      name: "email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter Your Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Your Password",
        },
      },
      async authorize(credentials) {
        const email = credentials?.email;
        const password = credentials?.password;

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        try {
          // Find user in the database
          const user = await prisma.user.findFirst({
            where: { email },
          });

          if (!user) {
            throw new Error("Invalid email or password");
          }

          // Verify password
          const isPasswordValid = await bcrypt.compare(password, user.password);

          if (!isPasswordValid) {
            throw new Error("Invalid email or password");
          }

          // Return user data to include in the JWT
          return {
            id: user.id,
            email: user.email,
          };
        } catch (error) {
          console.error("Authorization error:", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn", // Custom sign-in page
  },
  callbacks: {
    async jwt({ token, user }) {
      // Add user data to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      // Attach token data to the session object
      if (token) {
        session.user = {
          email: token.email,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "123321", // Replace with a strong secret key
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler;
