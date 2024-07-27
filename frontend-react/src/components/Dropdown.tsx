import React from "react";

interface DropdownProps {
  options: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ options }) => {
  return (
    <select>
      {options.map((option: string) => {
        return <option value={option}>{option}</option>;
      })}
    </select>
  );
};

export default Dropdown;
