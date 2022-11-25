"use client";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Page() {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    return (
      <>
        <div className=" columns-1 md:columns-2">
          <p className="text-5xl text-stone-100">Ride Share With BRACU</p>
          <button
            className="inline-block px-3 py-2.5 bg-blue-600 rounded-md text-zinc-50"
            onClick={() => signIn("google")}
          >
            Sign in with your BRACU G-Suite Account
          </button>
        </div>
      </>
    );
  } else {
    router.push("/home");
  }
}
