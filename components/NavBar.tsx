import React from "react";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <a className="text-2xl font-bold">My App</a>
        </Link>
        <div>
          <Link href="/about">
            <a className="px-4 py-2 hover:underline">About</a>
          </Link>
          <Link href="/contact">
            <a className="px-4 py-2 hover:underline">Contact</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
