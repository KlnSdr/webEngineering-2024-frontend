import React, { useState } from "react";

interface LabelInputProps {
  labelText: string;
  initialValue: string;
  onChange: (value: string) => void;
}

const LabelInput: React.FC<LabelInputProps> = ({
  labelText,
  initialValue,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <div>
      <label>{labelText}</label>
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
