import { createContext, useReducer } from "react";

export const ClassContext = createContext({
  classes: [],
  addImages: () => [],
  addClass: () => {},
  removeClass: () => {},
  deleteImage: () => {},
  renameClass: () => {},
});

function classReducerFunction(state, action) {
  if (action.type === "ADD_IMAGES") {
    const existingClassIndex = state.findIndex(
      (classItem) => classItem.id === action.id
    );
    const existingClass = state[existingClassIndex];
    const updatedClass = { ...existingClass, images: action.images };

    const updatedState = [...state];
    updatedState.splice(existingClassIndex, 1, updatedClass);

    return updatedState;
  }

  if (action.type === "ADD_CLASS") {
    return [
      ...state,
      {
        id: Math.random(),
        name: `Class ${state.length + 1}`,
        images: [],
      },
    ];
  }

  if (action.type === "REMOVE_CLASS") {
    const existingClassIndex = state.findIndex(
      (classItem) => classItem.id === action.id
    );

    const updatedState = [...state];
    updatedState.splice(existingClassIndex, 1);

    return updatedState;
  }

  if (action.type === "DELETE_IMAGE") {
    const existingClassIndex = state.findIndex(
      (classItem) => classItem.id === action.classId
    );

    const existingClass = state[existingClassIndex];
    const updatedClass = {
      ...existingClass,
      images: [...existingClass.images].filter(
        (image) => image.id !== action.imageId
      ),
    };

    const updatedState = [...state];
    updatedState.splice(existingClassIndex, 1, updatedClass);

    return updatedState;
  }

  if (action.type === "RENAME_CLASS") {
    const existingClassIndex = state.findIndex(
      (classItem) => classItem.id === action.classId
    );

    const existingClass = state[existingClassIndex];

    const updatedClass = { ...existingClass, name: action.name };

    const updatedState = [...state];
    updatedState.splice(existingClassIndex, 1, updatedClass);

    return updatedState;
  }

  return state;
}

const ClassContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(classReducerFunction, [
    {
      id: Math.random(),
      name: "Class 1",
      images: [],
    },
  ]);

  function handleAddImages(id, images) {
    dispatch({ type: "ADD_IMAGES", id, images });
  }

  function handleAddClass() {
    dispatch({ type: "ADD_CLASS" });
  }

  function handleRemoveClass(id) {
    dispatch({ type: "REMOVE_CLASS", id });
  }

  function handleDeleteImage(classId, imageId) {
    dispatch({ type: "DELETE_IMAGE", classId, imageId });
  }

  function handleRenameClass(classId, name) {
    dispatch({ type: "RENAME_CLASS", classId, name });
  }

  const classCtx = {
    classes: state,
    addImages: handleAddImages,
    addClass: handleAddClass,
    removeClass: handleRemoveClass,
    deleteImage: handleDeleteImage,
    renameClass: handleRenameClass,
  };

  return (
    <ClassContext.Provider value={classCtx}>{children}</ClassContext.Provider>
  );
};

export default ClassContextProvider;
