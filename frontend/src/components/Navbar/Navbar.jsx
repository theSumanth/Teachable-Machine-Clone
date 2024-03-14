import { useState } from "react";

import { Plus, AlignJustify, HelpCircle } from "lucide-react";

import Sidebar from "./Sidebar";
import SidebarItem from "./SidebarItem";

const Navbar = () => {
  const [isHide, setIsHide] = useState(true);

  function handleHideNavbar() {
    setIsHide((prev) => !prev);
  }

  function Header() {
    return (
      <header
        onClick={handleHideNavbar}
        className="flex fixed cursor-pointer w-[320px] z-20 py-5 px-6 gap-2 items-center rounded-tl-none rounded-lg shadow-md border-2 bg-white hover:border-blue-400 mb-3"
      >
        <AlignJustify className="text-gray-700" />
        <h1 className="text-xl font-bold text-blue-600">Teachable Machine</h1>
      </header>
    );
  }

  let cssClass = "transition-all";

  if (isHide) {
    cssClass += " -translate-x-96";
  }

  return (
    <>
      <Header />
      <div className={cssClass}>
        <Sidebar>
          <SidebarItem Icon={Plus} text={"New project"} />
          <hr className="mt-2 mb-2" />
          <SidebarItem Icon={HelpCircle} text={"How to use?"} />
        </Sidebar>
      </div>
    </>
  );
};

export default Navbar;
