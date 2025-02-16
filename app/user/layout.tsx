"use client";

import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/ui/Sidebar";
import Header from "../components/ui/Header";

export default function UserLayout({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const router = useRouter();

  // Redirect to home if user is unauthenticated
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/");
    }
  }, [status, router]);

  if (status === "unauthenticated") {
    return null; // Prevent rendering before redirect
  }

  // Render layout only for authenticated users
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
