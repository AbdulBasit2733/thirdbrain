import React from "react";
import SidebarItem from "./SidebarItem";
import YoutubeIcon from "../Icons/YoutubeIcon";
import TwitterIcon from "../Icons/TwitterIcon";
import Logo from "../Icons/Logo";
import FolderIcon from "../Icons/FolderIcon";

const Sidebar = () => {
  return (
    <div className="w-60 h-screen bg-white border-r left-0 top-0 py-5 px-5">
      <h1 className="text-2xl text-indigo-600 font-extrabold tracking-wider text-center flex items-center gap-2">
        <Logo />
        Third Brain
      </h1>
      <div className="pt-10 space-y-3">
        <SidebarItem text="Twitter" icon={<TwitterIcon />} />
        <SidebarItem text="Youtube" icon={<YoutubeIcon />} />
        <SidebarItem text="All Contents" icon={<FolderIcon />} />
        <SidebarItem text="My Contents" icon={<FolderIcon />} />
      </div>
    </div>
  );
};

export default Sidebar;
