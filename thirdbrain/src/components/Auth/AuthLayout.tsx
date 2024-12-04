import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-l from-indigo-50 to-orange-50">
        <Outlet />
      </div>
  );
};

export default AuthLayout;
