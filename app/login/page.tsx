"use client";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const { data: session } = useSession();

  const [saved, setSaved] = useState(false);

  (async () => {
    if (session && saved === false) {
      const res = await fetch(`api/profile/${session?.user?.email}`, {
        method: "GET",
      });
      const data = await res.json();
      if (data) {
        setSaved(true);
      }
    }
  })();
  return (
    <>
      <div className="grid md:grid-cols-2 gap-5 md:divide-x">
        <p className="text-3xl text-stone-100 px-10 text-center">
          Sign in with your BRACU G-Suite
        </p>
        <div className="flex justify-center items-center">
          <button
            className="py-2 px-20 bg-blue-600 rounded-md text-zinc-50"
            onClick={() => {
              signIn("google");
            }}
          >
            🚗 Lessgo 🚗
          </button>
        </div>
      </div>
    </>
  );
}
