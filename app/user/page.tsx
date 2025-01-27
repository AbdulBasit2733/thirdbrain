"use client";
import React, { useEffect } from "react";
import Sidebar from "../components/ui/Sidebar";
import Header from "../components/ui/Header";
import { SessionProvider, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Dashboard from "../components/Dashboard";
import Profile from "../components/Profile";

const MainLayout = () => {
  const pathname = usePathname();

  const renderComponent = () => {
    console.log(pathname);

    if (pathname.includes("dashboard")) {
      return <Dashboard />;
    } else if (pathname === "/user/profile") {
      return <Profile />;
    } else if (pathname === "/user/youtube") {
      return null;
    }
  };
  useEffect(() => {
    renderComponent();
  }, [pathname]);
  return (
    <SessionProvider>
      <UserLayout>{renderComponent()}</UserLayout>
    </SessionProvider>
  );
};

export default MainLayout;

const UserLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = useSession();

  return (
    session.status === "authenticated" && (
      <div className="max-w-screen h-screen flex bg-slate-950 text-slate-300">
        <Sidebar />
        <div className="flex-1">
          <Header />
          {children}
        </div>
      </div>
    )
  );
};
