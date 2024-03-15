const Input = ({ label, id, ...props }) => {
  return (
    <div className="flex gap-2 items-center my-4 font-medium">
      <label className="text-sm" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="w-16 focus:outline-none bg-blue-100 px-2 py-1 border-2 rounded-sm text-sm font-medium focus:border-blue-300 text-blue-600"
      />
    </div>
  );
};

export default Input;
