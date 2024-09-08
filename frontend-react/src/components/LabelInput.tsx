import React, { useState, useEffect } from "react";
import Heading from "./Heading";

/**
 * Props for the LabelInput component.
 * @typedef {Object} LabelInputProps
 * @property {string} labelText - The text to display as the label.
 * @property {string} initialValue - The initial value of the input field.
 * @property {function} onChange - Callback function to handle changes in the input value.
 */
interface LabelInputProps {
  labelText: string;
  initialValue: string;
  onChange: (value: string) => void;
}

/**
 * LabelInput component renders a labeled input field with a heading.
 * @param {LabelInputProps} props - The props for the component.
 * @returns {JSX.Element} The rendered LabelInput component.
 */
const LabelInput: React.FC<LabelInputProps> = ({
  labelText,
  initialValue,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div>
      <Heading headingText={labelText} />
      <input
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        className="form-control"
      />
    </div>
  );
};

export default LabelInput;