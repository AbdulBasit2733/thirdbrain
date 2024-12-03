import React from "react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <div className="flex">
      <div className="flex flex-1 h-screen justify-center items-center border-r">
        <div>
          <h1 className="text-4xl text-indigo-600 font-extrabold tracking-wider text-wrap">
            Welcome To The Second Brain
          </h1>
          <p className="text-center text-xl mt-5 font-semibold">This Will Become Your Third Brain</p>
        </div>
      </div>
      <div className=" flex flex-1 justify-center items-center">
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayout;
