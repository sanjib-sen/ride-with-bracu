import { unstable_getServerSession } from "next-auth/next";
import { SignIn } from "../components/SignIn";
import { SignOut } from "../components/SignOut";
import { createLocationData } from "../controllers/location";

export default async function Page() {
  const session = await unstable_getServerSession();
  if (session && session.user && session.user.email && session.user.name) {
    const sessionData = {
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
    };
    console.log(sessionData);
    await createLocationData("Shyamoli", sessionData);
  }

  if (!session) {
    return <SignIn />;
  } else {
    return <SignOut />;
  }
}
