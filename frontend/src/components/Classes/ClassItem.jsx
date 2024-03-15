import { useRef, useContext, useState } from "react";

import { ClassContext } from "../../store/ClassContextProvider";
import ImagesDisplay from "../../UI/ImagesDisplay";
import { Trash, Pencil, Upload, CheckCircle } from "lucide-react";

const ClassItem = ({ classItem, isMainClass }) => {
  const multipleInputRef = useRef();
  const inputRef = useRef();
  const [isEditing, setIsEditing] = useState(false);

  const classCtx = useContext(ClassContext);

  function handleEdit() {
    setIsEditing((prev) => !prev);
  }

  function handleSave() {
    classCtx.renameClass(classItem.id, inputRef.current.value);
    setIsEditing((prev) => !prev);
  }

  function handleUploadClick() {
    multipleInputRef.current.click();
  }

  function handleOnImagesChange(event, id) {
    const files = Array.from(event.target.files);

    if (files && files.length > 0) {
      const images = files.map((file) => ({
        id: Math.random(),
        url: URL.createObjectURL(file),
        file: file,
      }));
      classCtx.addImages(id, images);
    }
  }

  function handleRemoveClass(id) {
    const proceed = window.confirm("You want to delete this class?");
    if (proceed) {
      classCtx.removeClass(id);
    }
  }

  let content = (
    <section className="flex p-2 mx-4 my-2 gap-2">
      <div
        onClick={handleUploadClick}
        className="flex flex-col items-center bg-blue-100 text-blue-600 p-2 rounded-md aspect-square w-14 h-14 cursor-pointer"
      >
        <Upload />
        <span className="text-xs">Upload</span>
      </div>
      <div className="">
        <ImagesDisplay images={classItem.images} classId={classItem.id} />
      </div>
      <input
        ref={multipleInputRef}
        type="file"
        onChange={(event) => handleOnImagesChange(event, classItem.id)}
        multiple
        className="hidden"
      />
    </section>
  );

  return (
    <li className=" flex flex-col bg-white rounded-md shadow-md w-[600px] mb-6">
      <header className="flex items-center justify-between gap-2 px-2 py-4 mx-4">
        <div className="flex items-center gap-2">
          {isEditing && (
            <>
              <input
                ref={inputRef}
                type="text"
                id="classname"
                className="text-gray-800 font-medium bg-blue-100 focus:outline-none rounded-sm"
                defaultValue={classItem.name}
              />
              <CheckCircle
                onClick={handleSave}
                size={16}
                color="green"
                className="cursor-pointer"
              />
            </>
          )}

          {!isEditing && (
            <>
              <p className="text-gray-800 font-medium">{classItem.name}</p>
              <Pencil size={14} color="gray" onClick={handleEdit} />
            </>
          )}
        </div>

        {!isMainClass && (
          <Trash
            onClick={() => handleRemoveClass(classItem.id)}
            size={15}
            className="cursor-pointer text-red-500"
          />
        )}
      </header>
      <hr />
      <p className="text-sm text-gray-600 p-2 mx-4 mt-1">
        {classItem.images.length ? `${classItem.images.length} ` : "Add "}
        Image Samples:
      </p>
      {content}
    </li>
  );
};
export default ClassItem;
