"use client";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignIn() {
  const { status } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (status === "authenticated") {
      router.push("/location");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

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
