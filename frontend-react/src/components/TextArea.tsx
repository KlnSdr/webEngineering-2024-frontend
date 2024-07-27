import React, { useState } from "react";

interface TextAreaProps {
  initialValue: string;
}

const TextArea: React.FC<TextAreaProps> = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue);
  return (
    <textarea
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    ></textarea>
  );
};

export default TextArea;
