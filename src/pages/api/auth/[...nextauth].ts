import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";

export const authOptions: NextAuthOptions = {
  // Include user.id on session
  callbacks: {
    // async signIn({ user, account, profile, email, credentials }) {
    //   // const isAllowedToSignIn = true
    //   // if (isAllowedToSignIn) {
    //   //   return true
    //   // } else {
    //   //   // Return false to display a default error message
    //   //   return false
    //   //   // Or you can return a URL to redirect to:
    //   //   // return '/unauthorized'
    //   // }
    //   return "/redirect";
    // },
  },
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
    // ...add more providers here
  ],
};

export default NextAuth(authOptions);
