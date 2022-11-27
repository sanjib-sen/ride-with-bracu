import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

let googleId: string;
let googleScreet: string;

if (process.env.GOOGLE_ID && process.env.GOOGLE_SECRET) {
  googleId = process.env.GOOGLE_ID;
  googleScreet = process.env.GOOGLE_SECRET;
} else {
  throw new Error("Environment Variable Error. Please check .env file");
}

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: googleId,
      clientSecret: googleScreet,
    }),
  ],
});
