"use client";

import Link from "next/link";
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();
  if (pathname == "/") {
    return <div className="flex"></div>;
  }
  return (
    <nav className="flex justify-between px-10 pt-5">
      <div className=" text-white mr-6">
        <span className="font-semibold text-4xl tracking-tight">
          🚌 Ride With BRACU
        </span>
      </div>
      <div>
        <Link
          href="/"
          className="block lg:inline-block lg:mt-0 text-white mr-4"
        >
          Home
        </Link>
        <Link
          href="/profile"
          className="block lg:inline-block lg:mt-0 text-white mr-4"
        >
          Profile
        </Link>

        <button
          onClick={() => {
            signOut();
            router.push("/");
          }}
          className="inline-block text-xl px-4 py-2 border rounded text-white border-white"
        >
          Sign Out
        </button>
      </div>
    </nav>
  );
};

export default Nav;
