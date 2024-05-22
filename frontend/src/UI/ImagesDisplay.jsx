import { useContext } from "react";

import { ClassContext } from "../store/ClassContextProvider";

const ImagesDisplay = ({ images, classId }) => {
  const classCtx = useContext(ClassContext);

  function handleDelete(imageId) {
    const proceed = window.confirm("You want to delete this image?");

    if (proceed) {
      classCtx.deleteImage(classId, imageId);
    }
  }

  return (
    <ul className="grid grid-cols-9">
      {images.map((image) => (
        <li
          key={image.id}
          className="w-14 h-14 object-cover p-1 cursor-pointer hover:bg-blue-200"
          onClick={() => handleDelete(image.id)}
        >
          <img
            src={image.url}
            alt="uploaded image"
            className="w-14 h-14 object-contain"
          />
        </li>
      ))}
    </ul>
  );
};

export default ImagesDisplay;
