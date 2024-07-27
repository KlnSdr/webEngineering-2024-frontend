import React, { useState } from "react";

interface DropdownProps {
  options: string[];
  initialValue: string;
  onChange: (value: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  initialValue,
  onChange,
}) => {
  const [value, setValue] = useState(initialValue);
  return (
    <select
      onChange={(e) => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
    >
      {options.map((option: string) => {
        if (option === value) {
          return (
            <option value={option} selected>
              {option}
            </option>
          );
        } else {
            return <option value={option}>{option}</option>;
        }
      })}
    </select>
  );
};

export default Dropdown;
