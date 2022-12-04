import { unstable_getServerSession } from "next-auth/next";
import { SignIn } from "../components/SignIn";
import { createUserModel } from "../controllers/location";
import { userData } from "../types/userData";
import HomePage from "../components/HomePage";
export default async function Page() {
  const session = await unstable_getServerSession();
  // if (session && session.user && session.user.email && session.user.name) {
  //   // const sessionData: userData = {
  //   //   name: session.user.name,
  //   //   email: session.user.email,
  //   //   image: session.user.image,
  //   // };
  //   // await createUserModel(sessionData);
  // }

  if (!session) {
    return <SignIn />;
  } else {
    return <HomePage />;
  }
}
