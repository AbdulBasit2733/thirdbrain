"use client";
import { SessionProvider, useSession } from "next-auth/react";
import React from "react";
import Sidebar from "../components/ui/Sidebar";
import Header from "../components/ui/Header";
import { useRouter } from 'next/router'
const UserHome = () => {
  return (
    <SessionProvider>
      <Main />
    </SessionProvider>
  );
};

export default UserHome;

const Main = () => {
  const session = useSession();
const router = useRouter()
  return (
    <div className="max-w-screen h-screen flex bg-slate-950 text-slate-300">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div>
            {
                router
            }
        </div>
      </div>
    </div>
  );
};
