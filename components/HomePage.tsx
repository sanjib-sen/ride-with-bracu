"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { getUserSession } from "../session/session";
import Image from "next/image";
import Warning from "./Notes/Warning";
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
            router.push("/search");
          } else {
            router.push("/profile");
          }
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  return (
    <>
      {/* Change the following from hidden to grid to show the Easter Egg */}
      <div className="justify-center items-center justify-items-center gap-5 hidden">
        <Warning
          showTitle={true}
          description="Please Refresh this page if you are stuck here."
        />
        <p className="text-slate-200 text-2xl">
          How do I sleep knowing that I have 69 retake courses to take
        </p>
        <Image src="/easter-egg/messi.jpg" width={300} height={300} alt="Lol" />
      </div>
    </>
  );
}
