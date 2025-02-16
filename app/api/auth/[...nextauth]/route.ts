import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaClient } from "@prisma/client";
import { Provider } from "@prisma/client";
import { DefaultSession } from "next-auth"

declare module "next-auth" {
  interface Session {
    user?: {
      id: number
    } & DefaultSession["user"]
  }
}

const prisma = new PrismaClient();

const authOptions: NextAuthOptions = {
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
    async signIn({ user, account, profile }) {
      console.log(user);
      console.log(account);
      console.log(profile);
      if (user.email) {
        try {
          // Check if user exists
          const existingUser = await prisma.user.findUnique({
            where: {
              email: user.email,
            },
          });

          // If user doesn't exist, create new user
          if (!existingUser) {
            await prisma.user.create({
              data: {
                email: user.email,
                name: user.name || null,
                image: user.image || null,
                provider: Provider.GOOGLE,
              },
            });
          }

          return true;
        } catch (error) {
          console.error("Error during sign in:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        const dbUser = await prisma.user.findUnique({
          where: { email: user.email! }
        });
        if (dbUser) {
          token.id = dbUser.id;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.id as number
        };
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signIn",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
