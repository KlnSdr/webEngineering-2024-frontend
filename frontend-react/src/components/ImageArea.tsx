import React from "react";

/**
 * Interface for the ImageSrc props.
 * @typedef {Object} ImageSrc
 * @property {string} origin - The source URL of the image.
 */
interface ImageSrc{
    origin: string;
}

/**
 * ImageArea component renders an image with the provided source URL.
 * @param {ImageSrc} props - The props for the component.
 * @returns {JSX.Element} The rendered ImageArea component.
 */
const ImageArea: React.FC<ImageSrc> = ({origin}) => {
  return (
    <div className="ImageArea">
      <img src={origin} alt="dish"/>
    </div>
  );
}

export default ImageArea;