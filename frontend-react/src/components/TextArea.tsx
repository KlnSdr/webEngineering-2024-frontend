import React, { useState } from "react";

interface TextAreaProps {
  initialValue: string;
  onChange: (content: string) => void;
}

const TextArea: React.FC<TextAreaProps> = ({ initialValue, onChange }) => {
  const [value, setValue] = useState(initialValue);
  return (
    <textarea
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      className="form-control"
    ></textarea>
  );
};

export default TextArea;
