import { unstable_getServerSession } from "next-auth/next";
import { SignIn } from "../components/SignIn";
import { Profile } from "../components/Profile";
import { createUserModel } from "../controllers/location";
import { userData } from "../types/userData";

export default async function Page() {
  const session = await unstable_getServerSession();
  if (session && session.user && session.user.email && session.user.name) {
    const sessionData: userData = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
    // await createUserModel(sessionData);
  }

  if (!session) {
    return <Profile />;
  } else {
    return <Profile />;
  }
}
