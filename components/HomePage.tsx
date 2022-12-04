"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { SignIn } from "./SignIn";
export default function HomePage() {
  const router = useRouter();
  const { data: session } = useSession();
  if (!session) {
    return <SignIn />;
  } else {
    router.push("/location");
  }
  return <></>;
}
