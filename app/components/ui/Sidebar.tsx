"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ReactElement } from "react";
import DashboardIcon from "../Icons/DashboardIcon";
import YoutubeIcon from "../Icons/YoutubeIcon";
import TwitterIcon from "../Icons/TwitterIcon";
import DocIcon from "../Icons/DocIcon";
import ImageIcon from "../Icons/ImageIcon";
import SettingsIcon from "../Icons/SettingsIcon";

const Sidebar = () => {
  return (
    <div className="w-64 p-5 bg-slate-950 text-slate-200 h-screen flex flex-col gap-10">
      <h1 className="text-2xl text-center font-extrabold tracking-widest">
        ThirdBrain
      </h1>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-4">
          <SidebarItems name="Dashboard" link="/user/dashboard" icon={<DashboardIcon />} />
          <SidebarItems name="Youtube" link="/user/youtube" icon={<YoutubeIcon />} />
          <SidebarItems name="Twitter" link="/user/twitter" icon={<TwitterIcon />} />
          <SidebarItems name="File" link="/user/file" icon={<DocIcon />} />
          <SidebarItems name="Image" link="/user/image" icon={<ImageIcon />} />
        </div>
        <div className="flex flex-col gap-5">
          <SidebarItems name="Settings" link="/user/settings" icon={<SettingsIcon />} />
          <Link href={"https://x.com/Abdul_2003_"} target="_blank">
            <p className="text-xs font-extrabold pl-2">@ Abdul Basit Khan</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

interface SidebarItemsProps {
  link: string;
  name: string;
  icon?: ReactElement;
}

const SidebarItems = ({ link, name, icon }: SidebarItemsProps) => {
  const pathname = usePathname();
  const isActive = pathname === link;

  return (
    <Link
      href={link}
      className={`py-2 px-5 rounded-lg flex gap-x-5 transition-all ease-in-out duration-300 ${
        isActive ? "bg-slate-900 text-slate-200" : " text-slate-200 hover:bg-slate-900 hover:gap-x-10"
      }`}
    >
      {icon}
      <h1 className="text-base font-medium">{name}</h1>
    </Link>
  );
};
