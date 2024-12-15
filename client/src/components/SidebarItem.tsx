import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ text, icon, link }: { text: string; icon: ReactElement, link:string }) => {
  return (
    <Link to={link} className="flex items-center gap-5 bg-slate-200 hover:bg-orange-50 hover:text-orange-500 transition-all duration-300 text-sm text-slate-800 px-3 py-2 rounded-md">
      {icon}
      <h1 className="font-semibold tracking-widest">{text}</h1>
    </Link>
  );
};

export default SidebarItem;
