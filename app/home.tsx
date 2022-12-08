"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { getUserSession } from "../session/session";
export default function HomePage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      (async () => {
        if (session.user?.email) {
          const user = await getUserSession(session.user.email);
          if (user && user.defaultLocationName) {
            router.push("/location");
          }
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  return <></>;
}
