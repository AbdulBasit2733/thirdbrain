import React, { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { Outlet } from "react-router-dom";

const Dasboard = () => {
  

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="flex-1">
        <Header />
        <div className="p-5 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dasboard;
