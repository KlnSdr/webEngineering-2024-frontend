import React, { useState } from "react";
import "../style/Dropdown.css";

/**
 * Props for the Dropdown component.
 * @typedef {Object} DropdownProps
 * @property {string[]} options - List of options to display in the dropdown.
 * @property {string} initialValue - Initial value for the dropdown input.
 * @property {function} onChange - Callback function to handle changes in the selected option.
 */
interface DropdownProps {
    options: string[],
    initialValue: string,
    onChange: (value: string) => void,
}

/**
 * Dropdown component allows users to filter and select an option from a list.
 * @param {DropdownProps} props - The props for the component.
 * @returns {JSX.Element} The rendered Dropdown component.
 */
const Dropdown: React.FC<DropdownProps> = ({
  options,
  initialValue,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [filterValue, setFilterValue] = useState(initialValue);

  return (
    <div>
      <input
        className="form-control"
        type="text"
        value={filterValue}
        onChange={(e) => {
          setFilterValue(e.target.value);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 200)}
      />
      {open && (
        <div className="dropdownOptionsContainer">
          {options
            .filter((option: string) =>
              option.toLowerCase().includes(filterValue.toLowerCase())
            )
            .map((option: string) => {
              return (
                <div
                  className="dropdownOption"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setOpen(false);
                    setFilterValue(option);
                    onChange(option);
                  }}
                >
                  {option}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Dropdown;