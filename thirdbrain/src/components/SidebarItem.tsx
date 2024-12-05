import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ text, icon, link }: { text: string; icon: ReactElement, link:string }) => {
  return (
    <Link to={link} className="flex items-center gap-5 bg-slate-100 hover:bg-slate-300 transition-all duration-300 text-sm text-indigo-600 px-3 py-2 rounded-md">
      {icon}
      <h1 className="text-black font-semibold">{text}</h1>
    </Link>
  );
};

export default SidebarItem;
