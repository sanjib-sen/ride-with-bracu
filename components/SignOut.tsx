import { signOut } from "next-auth/react";

export const SignOut = () => {
  return (
    <>
      <button
        className="py-2 px-20 bg-blue-600 rounded-md text-zinc-50 text-md justify-self-stretch"
        onClick={() => {
          signOut();
        }}
      >
        Sign Out
      </button>
    </>
  );
};
