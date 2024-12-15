
import SidebarItem from "./SidebarItem";
// import Logo from "../Icons/Logo";

import { Link } from "react-router-dom";
import TwitterIcon from "./Icons/TwitterIcon";
import YoutubeIcon from "./Icons/YoutubeIcon";
import DocumentIcon from "./Icons/DocumentIcon";

const Sidebar = () => {
  return (
    <div className="w-60 h-screen border-r border-slate-100 left-0 top-0 py-5 px-5">
      <Link to={'/'} className="text-2xl text-orange-500 font-extrabold tracking-widest text-center flex items-center gap-2">
        {/* <Logo /> */}
        Third Brain
      </Link>
      <div className="pt-10 space-y-3">
        <SidebarItem link="/twitter-contents" text="Twitter" icon={<TwitterIcon />} />
        <SidebarItem link="/youtube-contents" text="Youtube" icon={<YoutubeIcon />} />
        <SidebarItem link="/doc-contents" text="Documents" icon={<DocumentIcon />} />
      </div>
    </div>
  );
};

export default Sidebar;
