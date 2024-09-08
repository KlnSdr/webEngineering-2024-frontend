import React, { useEffect, useState } from "react";
import Heading from "./Heading";

/**
 * Props for the TextArea component.
 * @typedef {Object} TextAreaProps
 * @property {string} initialValue - The initial value of the textarea.
 * @property {function} onChange - Callback function to handle changes in the textarea value.
 */
interface TextAreaProps {
  initialValue: string;
  onChange: (content: string) => void;
}

/**
 * Props for the TextArea2 component.
 * @typedef {Object} TextAreaProps2
 * @property {string} initialValue - The initial value of the textarea.
 * @property {string} Header - The header text to display above the textarea.
 */
interface TextAreaProps2 {
    initialValue: string;
    Header: string;
}

/**
 * TextArea component renders a textarea with an initial value and an onChange handler.
 * @param {TextAreaProps} props - The props for the component.
 * @returns {JSX.Element} The rendered TextArea component.
 */
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

/**
 * TextArea2 component renders a read-only textarea with a header.
 * @param {TextAreaProps2} props - The props for the component.
 * @returns {JSX.Element} The rendered TextArea2 component.
 */
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