const CustomImage = ({ source, altText }) => {
  return (
    <div className="text-blue-600 aspect-square my-2 flex object-cover justify-center items-center rounded">
      {source && <img src={source} alt={altText} />}
    </div>
  );
};

export default CustomImage;
