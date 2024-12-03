import React, { ReactElement } from "react";

const SidebarItem = ({ text, icon }: { text: string; icon: ReactElement }) => {
  return (
    <div className="flex items-center gap-5 bg-slate-100 hover:bg-slate-300 transition-all duration-300 text-sm text-indigo-600 px-3 py-2 rounded-md">
      {icon}
      <h1 className="text-black font-semibold">{text}</h1>
    </div>
  );
};

export default SidebarItem;
