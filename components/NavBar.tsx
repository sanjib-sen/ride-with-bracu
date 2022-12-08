"use client";

import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { removeUserSession } from "../session/session";
const Nav = () => {
  const pathname = usePathname();
  if (pathname === "/login") {
    return <div></div>;
  }
  return (
    <nav className="flex md:justify-between md:px-10 pt-5 px-5 justify-center ">
      <div className=" text-white mr-6 md:block hidden">
        <Link className="font-semibold text-4xl tracking-tight" href="/">
          🚌 Ride With BRACU
        </Link>
      </div>
      <div className="mt-5 md:mt-0 text-2xl md:text-xl">
        <Link href="/" className="md:hidden inline-block text-white mr-4">
          Home
        </Link>
        <Link href="/profile" className="inline-block text-white mr-4">
          Profile
        </Link>
        <button
          className="inline-block md:hidden text-white mr-4"
          onClick={() => {
            signOut({ callbackUrl: "/login" });
          }}
        >
          Sign Out
        </button>
        <button
          onClick={async () => {
            await removeUserSession();
            signOut({ callbackUrl: "/login" });
          }}
          className="hidden md:inline-block text-xl px-4 py-2 border rounded text-white border-white"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Nav;
