import NextAuth from "next-auth";
import { authOptions } from "@/app/utils/config"; // Ensure correct path

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
