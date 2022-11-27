"use client";
import { useSession } from "next-auth/react";
import { SignIn } from "../components/SignIn";
import { SignOut } from "../components/SignOut";
export default function Page() {
  const { data: session } = useSession();
  if (!session) {
    return <SignIn />;
  } else {
    return <SignOut />;
  }
}
