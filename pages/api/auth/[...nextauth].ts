import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";

let googleId: string;
let googleScreet: string;

if (process.env.GOOGLE_ID && process.env.GOOGLE_SECRET) {
  googleId = process.env.GOOGLE_ID;
  googleScreet = process.env.GOOGLE_SECRET;
} else {
  throw new Error("Environment Variable Error. Please check .env file");
}

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleScreet,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
};

export default NextAuth(authOptions);
