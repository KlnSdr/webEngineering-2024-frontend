import React from "react";


interface ImageSrc{
    origin: string;
}

const ImageArea: React.FC<ImageSrc> = ({origin}) => {
  return (
    <div className="ImageArea">
      <img src={origin} alt="Picture"/>
    </div>
  );
}

export default ImageArea;