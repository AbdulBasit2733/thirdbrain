import React from "react";
import { Button } from "./Button";
import { signOut } from "next-auth/react";

const Header = () => {
  return (
    <div className="py-3 px-5 flex justify-between items-center border-b border-slate-900">
      <h1 className="text-xl font-bold tracking-wide">Welcome To The ThirdBrain</h1>
      <div className="flex items-center gap-5">
        <Button onClick={signOut}>Logout</Button>

        <img src="" alt="user" className="rounded-full w-10 h-10 border" />
      </div>
    </div>
  );
};

export default Header;
