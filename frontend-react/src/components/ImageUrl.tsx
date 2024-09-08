import React, { useState, useEffect } from "react";

/**
 * Props for the ImageUrl component.
 * @typedef {Object} ImageUrlProps
 * @property {string} url - The URL of the image to display.
 */
interface ImageUrlProps {
    url: string;
}


/**
 * ImageUrl component checks if the provided image URL is valid and displays the image.
 * If the URL is invalid, it displays an error message.
 * @param {ImageUrlProps} props - The props for the component.
 * @returns {JSX.Element} The rendered ImageUrl component.
 */
const ImageUrl: React.FC<ImageUrlProps> = ({ url }) => {
    const [isValid, setIsValid] = useState<boolean>(true);

    useEffect(() => {
        const img = new Image();
        img.src = url;
        img.onload = () => setIsValid(true);
        img.onerror = () => setIsValid(false);
    }, [url]);

    return (
        <div className="mt-2">
            {isValid ? (
                <img src={url} alt="dish" style={{ width: "300px", height: "auto" }} />
            ) : (
                <p>Invalid image URL</p>
            )}
        </div>
    );
};

export default ImageUrl;