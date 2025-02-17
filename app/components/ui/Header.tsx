"use client";
import React from "react";
import { Button } from "./Button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Header = () => {
  const { data: session, status } = useSession();

  return (
    <div className="py-3 px-5 flex justify-between items-center border-b border-slate-200">
      <h1 className="text-xl font-bold tracking-wide">
        Welcome To The ThirdBrain
      </h1>
      <div className="flex items-center gap-5">
        <Button onClick={() => signOut({ callbackUrl: "/" })}>Logout</Button>

        {status === "loading" ? (
          <span className="text-gray-500 text-sm">Loading...</span>
        ) : session?.user?.image ? (
          <Image
            src={session.user.image}
            alt="user"
            width={32}
            height={32}
            className="rounded-full"
          />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-user"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        )}
      </div>
    </div>
  );
};

export default Header;
