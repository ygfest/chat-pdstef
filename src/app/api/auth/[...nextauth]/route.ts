import NextAuth, { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";
import { uptime } from "process";
import bcrypt from "bcrypt"
import prisma from "@/prisma/prisma/db";
import { toast } from "sonner";
import { TSignInSchema } from "@/app/(auth)/sign-in/page";

// Define NextAuth options
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), // Ensure correct use of PrismaAdapter
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { email, password } = credentials as TSignInSchema
        const user = await prisma.user.findFirst({
          where: {
            email,
          },
        });
        
        if(!user || !user.password){
          toast.error("Invalid credentials")
          return null
        }
        const didMatch = bcrypt.compare(password, user?.password)
        if (!didMatch) {
          throw Error("Invalid credentials")
          return null
        }
        return user// Return user object
      },
    }),
  ],
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token, user }) {
      return session;
    },
  },
};

// Create the NextAuth handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
