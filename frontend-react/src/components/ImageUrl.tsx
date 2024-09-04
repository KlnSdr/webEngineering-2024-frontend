import React, { useState, useEffect } from "react";

interface ImageUrlProps {
    url: string;
}

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