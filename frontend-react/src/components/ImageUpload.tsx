import React, { ChangeEvent, useState } from "react";
import Button from "react-bootstrap/Button";

interface ImageUploadProps {
  onChange: (img: File | null) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      onChange(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onChange(null);
  };

  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={inputRef}
      />
      {selectedImage && (
        <div>
          <h2>Image Preview:</h2>
          <img
            src={selectedImage}
            alt="Selected"
            style={{ width: "300px", height: "auto" }}
          />
          <Button onClick={handleRemoveImage}>Remove Image</Button>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
