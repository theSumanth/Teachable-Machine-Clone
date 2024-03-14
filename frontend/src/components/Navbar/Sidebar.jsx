import { AlignJustify } from "lucide-react";

const Sidebar = ({ children }) => {
  return (
    <aside className="h-screen shadow-2xl z-10 w-[310px] fixed backdrop-blur">
      <header className="flex py-5 px-6 gap-2 items-center rounded-tl-none rounded-lg shadow-md border-2 hover:border-blue-400 mb-3">
        <AlignJustify className="text-gray-700" />
        <h1 className="text-xl font-bold text-blue-600">Teachable Machine</h1>
      </header>
      <div className="">{children}</div>
    </aside>
  );
};

export default Sidebar;
