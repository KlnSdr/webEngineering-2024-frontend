import React, { useEffect, useState } from "react";
import Heading from "./Heading";

interface TextAreaProps {
  initialValue: string;
  onChange: (content: string) => void;
}

interface TextAreaProps2 {
    initialValue: string;
    Header: string;
}

const TextArea: React.FC<TextAreaProps> = ({ initialValue, onChange }) => {
  const [value, setValue] = useState("");
  useEffect(() => setValue(initialValue), [initialValue]);

  return (
    <textarea
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      className="form-control"
    rows={10}
    ></textarea>
  );
};

const TextArea2: React.FC<TextAreaProps2> = ({ initialValue, Header}) => {
    const [value, setValue] = useState("");
    useEffect(() => setValue(initialValue), [initialValue]);

    return (
        <div>
        <Heading headingText={Header}/>
        <textarea
        value={value}
        readOnly
        className="form-control"
        rows={10}
        ></textarea></div>
    );
}

export default TextArea;
export { TextArea2 };
