const Button = ({ isExport, children, ...props }) => {
  let cssClass = "px-4 py-2 mx-4 rounded-md text-sm block cursor-pointer";

  if (isExport) {
    cssClass += " bg-blue-100 hover:bg-blue-200 text-blue-600";
  } else {
    cssClass += " bg-gray-200 hover:bg-blue-100 text-gray-500";
  }

  return (
    <button className={cssClass} {...props}>
      {children}
    </button>
  );
};

export default Button;
