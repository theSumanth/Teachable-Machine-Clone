const SidebarItem = ({ Icon, text }) => {
  return (
    <div className="flex p-2 gap-2 font-medium items-center text-gray-700 hover:bg-blue-100 hover:text-blue-600 px-4 py-3">
      <Icon className="ml-2" />
      <p className="text-sm">{text}</p>
    </div>
  );
};

export default SidebarItem;
