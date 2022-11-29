"use client";
import { signIn } from "next-auth/react";

export const SignIn = () => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-5 md:divide-x">
        <p className="text-3xl text-stone-100 px-10 text-center">
          Sign in with your BRACU G-Suite
        </p>
        <div className="flex justify-center items-center justify-items-stretch justify-self-stretch">
          <button
            className="py-2 px-20 bg-blue-600 rounded-md text-zinc-50 text-md justify-self-stretch"
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
};
