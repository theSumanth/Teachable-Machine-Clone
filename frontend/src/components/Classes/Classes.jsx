import { useContext } from "react";

import { ClassContext } from "../../store/ClassContextProvider";
import ClassItem from "./ClassItem";

const Classes = () => {
  const classCtx = useContext(ClassContext);
  const { classes } = classCtx;

  console.log(classes);

  function handleAddClass() {
    classCtx.addClass();
  }

  return (
    <ul className="mt-32 mb-32">
      {classes.map((classItem, index) => {
        const isMainClass = index <= 1;

        return (
          <ClassItem
            key={classItem.id}
            classItem={classItem}
            isMainClass={isMainClass}
          />
        );
      })}
      <footer
        onClick={handleAddClass}
        className="w-[600px] mt-4 text-center p-7 rounded-xl border-dashed border-2 border-gray-400 text-gray-400 hover:border-blue-600 hover:text-blue-600 cursor-pointer"
      >
        + Add a Class
      </footer>
    </ul>
  );
};

export default Classes;
