import React, { ChangeEvent, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

/**
 * Props for the ImageUpload component.
 * @typedef {Object} ImageUploadProps
 * @property {string | null} initialValue - The initial value of the image.
 * @property {function} onChange - Callback function to handle changes in the selected image.
 */
interface ImageUploadProps {
  initialValue: string | null;
  onChange: (img: string | null) => void;
}

/**
 * ImageUpload component allows users to upload and preview an image.
 * @param {ImageUploadProps} props - The props for the component.
 * @returns {JSX.Element} The rendered ImageUpload component.
 */
const ImageUpload: React.FC<ImageUploadProps> = ({initialValue, onChange,}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    setSelectedImage(initialValue);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }, [initialValue]);

  /**
   * Handles the change event when a new image is selected.
   * @param {ChangeEvent<HTMLInputElement>} event - The change event.
   */
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  /**
   * Handles the removal of the selected image.
   */
  const handleRemoveImage = () => {
    setSelectedImage(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onChange(null);
  };

  return (
    <div>
      <label htmlFor={"image-upload"}>Wähle ein Bild aus:</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={inputRef}
        id={"image-upload"}
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